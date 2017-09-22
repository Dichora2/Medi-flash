require('isomorphic-fetch');
require('dotenv').config();
var parseString = require('xml2js').parseString;


const API_KEY = process.env.API_KEY;

function getDefinitionFromAPI(req, res, next) {
  fetch(`http://www.dictionaryapi.com/api/references/medical/v2/xml/${req.params.term}?key=${API_KEY}`)
    .then(fetchRes => {
      return fetchRes.text()
    })
    .then(textRes => {
      parseString(textRes, function (err, result) {
        const def_array = result.entry_list.entry[0].def[0].sensb;
        def_array.forEach((item,index) =>{
          let definition;
          if (typeof item.sens[0].dt[0] === 'object') {
            definition += (index + 1) + ': ' + item.sens[0].dt[0]._ +
             (item.sens[0].dt[0].fw) ? item.sens[0].dt[0].fw[0]:'' + ' ';
          } else {
            definition += (index + 1) + ': ' + item.sens[0].dt[0] + ' ';
          }
        });
        res.locals.definition = definition;
      });
      next();
    }).catch(err => {
      console.log(err);
      next();
    })
}

module.exports = {
  getDefinitionFromAPI,
}

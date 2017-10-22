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
        let definition = '';
        def_array.forEach((item,index) =>{
          console.log(item.sens[0].dt[0]);
          if (typeof item.sens[0].dt[0] === 'object') {
            console.log('item.sens[0].dt[0] is object = ', item.sens[0].dt[0]);
            definition += (index + 1) + ': ' +
            ((item.sens[0].dt[0].hasOwnProperty('_')) ? item.sens[0].dt[0]._ : item.sens[0].dt[0].sx) +
             ((item.sens[0].dt[0].hasOwnProperty('fw')) ? item.sens[0].dt[0].fw[0]:'') + ' ';
          } else {
            definition += (index + 1) + ': ' + item.sens[0].dt[0] + ' ';
            if (item.sens.length > 1) {
              for (i=1; i < item.sens.length; i++) {
                definition += '(' + item.sens[i].sn[0] + ') '
                if (item.sens[i].dt[0].hasOwnProperty('_')) {
                  definition += item.sens[i].dt[0]['_'];
                } else {
                  definition += item.sens[i].dt[0]
                }
                console.log(`item.sens[${i}].dt[0] = `,item.sens[i].dt[0]);
                definition += ' ';
                console.log(`item.sens[${i}] = `,item.sens[i]);
              }
            }
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

require('isomorphic-fetch');
require('dotenv').config();
var parseString = require('xml2js').parseString;

const API_KEY = process.env.API_KEY;

/* This function will request the definition of the term from the request object from the Merriam-Webster
   Medical Dictionary in XML format. It will then convert the XML response to JSON and parse it into a more
   readable format and pass it back in the res.locals.definition field.
*/

function getDefinitionFromAPI(req, res) {
  fetch(`http://www.dictionaryapi.com/api/references/medical/v2/xml/${req.params.term}?key=${API_KEY}`)
    .then(fetchRes => {
      return fetchRes.text()
    })
    .then(textRes => {
      console.log('textRes = ',textRes);
      parseString(textRes, function (err, result) {
        console.log('result = ',result);
        let definition = '';
        if (result.entry_list.hasOwnProperty('suggestion')) {
          definition = 'No definition found, suggestions: ' + result.entry_list.suggestion.join(', ');
          res.json({
            header: `Definition for ${req.params.term}`,
            definition: definition
          })
        } else if (result.entry_list.hasOwnProperty('entry')) {
          const def_array = result.entry_list.entry[0].def[0].sensb;
          def_array.forEach((item,index) =>{
            if (typeof item.sens[0].dt[0] === 'object') {
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
                  definition += ' ';
                }
              }
            }
          });
          res.json({
            header: `Definition for ${req.params.term}`,
            definition: definition
          })
        } else {
          res.json({
            header: `Definition for ${req.params.term}`,
            definition: 'No definition found'
          })
        }
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ err });
    })
}

module.exports = {
  getDefinitionFromAPI,
}

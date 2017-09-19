const express = require('express');
const app = express();

app.use(express.static('client/build'))


// app.get('/', function(req, res) {
//     res.render('hello world');
// });

app.listen(3001, function(){
    console.log('Example app listening on port 3000!')    
})



//dependencies 
const path = require('path')
const logger = require('morgan');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static('client/build'))


// app.get('/', function(req, res) {
//     res.render('hello world');
// });

app.listen(3001, function(){
    console.log('Example app listening on port 3000!')    
})



//dependencies 
const path = require('path')
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const express = require('express');

//App initialization 
const app = express();
require('dotenv').config();

//middlewares
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

//static sheets
/*app.get('/', (req, res) => {
  res.render('auth/login');
});
*/
//views
 app.get('/', function(req, res) {
     res.send('hello world');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
//routes
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);
const subjectRoutes = require('./routes/subject-routes');
app.use('/subject', subjectRoutes);
//dependencies
const path = require('path')
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

//App initialization
const app = express();
require('dotenv').config();

app.use((req, res, next) => {
  console.log('------- LOGGING METHOD ------');
  console.log(req.method);
  if (req.method == 'OPTIONS') console.log('what the fuck');
  next();
})

//middlewares
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors())
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Added to migrate to heroku
app.use(express.static(path.join(__dirname,'client/build')));

app.use((req, res, next) => {
  console.log('---------- req.user ---------')
  console.log(Date.now());
  console.log(req.user);
  if (req.user) console.log(req.user.id);
  next();
});

app.use((req, res, next) => {
  console.log('----------- REQ.SESSION -----------');
  console.log(Date.now());
  console.log(req.session);
  next();
})

//static sheets
/*app.get('/', (req, res) => {
  res.render('auth/login');
});
*/
//views
//  app.get('/', function(req, res) {
//      res.send('hello world');
// });

const PORT = process.env.PORT || 3000;
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
const flashcardRoutes = require('./routes/flashcard-routes');
app.use('/flashcard', flashcardRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('client/build/index.html'));
});

app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found!',
  });
});


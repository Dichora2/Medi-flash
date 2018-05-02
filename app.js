//dependencies
const express = require('express');
const path = require('path')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('dotenv').config();

//App initialization
const app = express();

app.use((req, res, next) => {
  console.log('------- LOGGING METHOD ------');
  console.log(req.method);
  next();
})

//middlewares
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

// Added to migrate to heroku
app.use(express.static(path.join(__dirname,'client/build')));

app.use((req, res, next) => {
  console.log('---------- req.user ---------')
  console.log(Date.now());
  console.log(req.user);
  next();
});

app.use((req, res, next) => {
  console.log('----------- REQ.SESSION -----------');
  console.log(Date.now());
  console.log(req.session);
  next();
})

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

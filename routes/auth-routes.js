const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  // res.render('auth/login');
});

authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});
authRouter.post('/register', usersController.create);
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'hi' });
});
// authRouter.post('/login', passport.authenticate('local'), (req, res) => {

//   res.json({ message: 'hi',
//   user: req.user
// });
// });


authRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure',
  failureFlash: true,
}));

authRouter.get('/success', (req, res) => {
  res.json({
    auth: true,
    message: 'ok',
    user: req.user,
  })
})

authRouter.get('/failure', (req, res) => {
  res.json({
    auth: false,
    message: 'login failed',
    user: null,
  })
})

// ;, {
//     successRedirect: '/',
//     failureRedirect: '/auth/login',
//     failureFlash: true,
//   })
// );
authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  module.exports = authRouter;

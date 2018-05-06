const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const usersController = require('../controllers/users-controller');

authRouter.post('/register', usersController.create);

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

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.json({
    auth: true,
    message: 'ok',
    user: req.user,
  })
});

module.exports = authRouter;

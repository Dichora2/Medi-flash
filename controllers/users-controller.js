const bcrypt = require('bcryptjs');
const User = require('../models/user');
const usersController = {};

usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password_digest: hash,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.json({
        auth: true,
        message: 'ok',
        user: req.user,
      })
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = usersController;

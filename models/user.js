const db = require('../db/config');
const User = {};

User.findAll = () => {
  return db.query('SELECT * FROM users ORDER BY id ASC');
};

User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

User.create = user => {
  return db.one(`
    INSERT INTO users
    (username, firstname, lastname, email, password_digest)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [user.username, user.firstname, user.lastname, user.email, user.password_digest]);
};
<<<<<<< HEAD
User.findAll = () => {
  return db.query('SELECT * FROM user ORDER BY id ASC');
};
module.exports = User;

=======

module.exports = User;




>>>>>>> 59b270f6d3f810be7663d933d4d97892107ff3f4

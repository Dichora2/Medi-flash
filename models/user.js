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
    (username, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user.username, user.email, user.password_digest]);
};
User.findAll = () => {
  return db.query('SELECT * FROM user ORDER BY id ASC');
};
module.exports = User;
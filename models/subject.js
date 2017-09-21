const db = require('../db/config');

const subject = {};

subject.findAll = () => {
  return db.query(`SELECT * FROM subject`);
};

subject.findById = id => {
  return db.oneOrNone(
    `
    SELECT * FROM subject
    WHERE id = $1
  `,
    [id]
  );
};

subject.create = subject => {
  return db.one(
    `
    INSERT INTO subject
    (user_id, term, created, name)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [user_id, date_created, name]
  );
};

subject.update = (subject, id) => {
  return db.one(
    `
    UPDATE subject
      user_id = $1,
      date_created = $2,
      name = $3,
    WHERE id = $4
    RETURNING *
  `,
    [user_id, date_created, name]
  );
};

subject.destroy = id => {
  return db.none(
    `
    DELETE FROM subject
    WHERE id = $1
  `,
    [id]
  );
};

module.exports = subject;

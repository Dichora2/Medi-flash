const db = require('../db/config');

const Subject = {};

Subject.findAll = () => {
  return db.query(`SELECT * FROM subjects`);
};

Subject.findById = id => {
  return db.oneOrNone(
    `
    SELECT * FROM subjects
    WHERE id = $1
  `,
    [id]
  );
};

Subject.create = subject => {
  return db.one(
    `
    INSERT INTO subjects
    (user_id, term, created, name)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [user_id, date_created, name]
  );
};

Subject.update = (subject, id) => {
  return db.one(
    `
    UPDATE subjects
      user_id = $1,
      date_created = $2,
      name = $3,
    WHERE id = $4
    RETURNING *
  `,
    [user_id, date_created, name]
  );
};

Subject.destroy = id => {
  return db.none(
    `
    DELETE FROM subject
    WHERE id = $1
  `,
    [id]
  );
};

module.exports = Subject;
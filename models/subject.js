const db = require('../db/config');

const Subject = {};


Subject.findAll = () => {
  return db.query(`SELECT * FROM subjects`);
};

Subject.findAllByUser = (user_id) => {
  return db.query(`
    SELECT * FROM subjects
    WHERE user_id = $1
    `,
    [user_id]
  );
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
    (user_id, name, date_modified)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    RETURNING *
  `,
    [subject.user_id, subject.name]
  );
};

Subject.update = (subject, id) => {
  return db.one(
    `
    UPDATE subjects SET
      name = $1,
      date_modified = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
  `,
    [subject.name, id]
  );
};

Subject.destroy = id => {
  return db.none(
    `
    DELETE FROM subjects
    WHERE id = $1
  `,
    [id]
  );
};

module.exports = Subject;


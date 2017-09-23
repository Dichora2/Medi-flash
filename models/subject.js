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
    (user_id, name, date_modified)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [subject.user_id, subject.name, subject.date_modified]
  );
};

Subject.update = (subject, id) => {
  return db.one(
    `
    UPDATE subjects
      user_id = $1,
      date_modified = $2,
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


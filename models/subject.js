const db = require('../db/config');

const Subject = {};

<<<<<<< HEAD
subject.findAll = () => {
  return db.query(`SELECT * FROM subject`);
};

subject.findById = id => {
=======

Subject.findAll = () => {
  return db.query(`SELECT * FROM subjects`);
};

Subject.findById = id => {

>>>>>>> 59b270f6d3f810be7663d933d4d97892107ff3f4
  return db.oneOrNone(
    `
    SELECT * FROM subjects
    WHERE id = $1


    
  `,
    [id]
  );
};

subject.create = subject => {
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

<<<<<<< HEAD
module.exports = subject;
=======
module.exports = Subject;

>>>>>>> 59b270f6d3f810be7663d933d4d97892107ff3f4

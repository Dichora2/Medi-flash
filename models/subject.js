const db = require('../db/config');

const Subject = {};

Subject.findAll = () => {
  return db.query(`SELECT * FROM subject`);
};


Subject.findById = id => {

  return db.oneOrNone(
    `
    SELECT * FROM subjects
    WHERE id = $1  `,
    [id]
  );
};


Subject.findByUserSubject = (user_id, subject_id) => {
  return db.query(
    `SELECT term, definition
      FROM flashcards
      JOIN users_flashcards
      ON flashcards.user_id = users_flashcards.user_id
      JOIN flashcards_subjects
      ON flashcards.id = flashcards_subjects.flashcard_id
      WHERE flashcards.user_id = $1 AND flashcards_subjects.subject_id = $2
    `,
    [user_id, subject_id]
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


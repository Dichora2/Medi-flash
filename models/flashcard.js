const db = require('../db/config');

const Flashcard = {};

Flashcard.findById = id => {
  return db.oneOrNone(
    `
    SELECT * FROM flashcards
    WHERE id = $1
  `,
    [id]
  );
};

Flashcard.showBySubject = (subject_id) => {
  return db.query(
    `
    SELECT * FROM flashcards
    WHERE flashcards.subject_id = $1
  `,
    [subject_id]
  );
};


Flashcard.showBySubjectHardOnes = (subject_id) => {
  return db.query(
    `
    SELECT * FROM flashcards
    WHERE flashcards.subject_id = $1 AND keep_studying = true
    `,
    [subject_id]
  )
}

Flashcard.create = flashcard => {
  return db.one(
    `
    INSERT INTO flashcards
    (subject_id, term, definition, date_modified)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    RETURNING *
  `,
    [flashcard.subject_id, flashcard.term, flashcard.definition]
  );
};

Flashcard.update = (flashcard, id) => {
  return db.one(
    `
    UPDATE flashcards SET
      term = $1,
      definition = $2,
      date_modified = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *
  `,
    [flashcard.term, flashcard.definition, id]
  );
};

Flashcard.destroy = id => {
  return db.none(
    `
    DELETE FROM flashcards
    WHERE id = $1
  `,
    [id]
  );
};



Flashcard.updateKeepStudying = id => {
  return db.one(
    `
    UPDATE flashcards SET
      keep_studying = NOT keep_studying WHERE id =$1
    RETURNING *
  `,
    [id]
  );
};


module.exports = Flashcard;

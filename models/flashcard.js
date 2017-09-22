const db = require('../db/config');

const Flashcard = {};

Flashcard.findAll = () => {
  return db.query(`SELECT * FROM flashcards`);
};

Flashcard.findById = id => {
  return db.oneOrNone(
    `
    SELECT * FROM flashcards
    WHERE id = $1
  `,
    [id]
  );
};

Flashcard.create = flashcard => {
  return db.one(
    `
    INSERT INTO flashcards
    (user_id, term, definition, date_modified)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
    [flashcard.user_id, flashcard.term, flashcard.definition, flashcard.date_modified, flashcard.keep_studying]
  );
};

Flashcard.update = (flashcard, id) => {
  return db.one(
    `
    UPDATE flashcards SET
      user_id = $1,
      term = $2,
      definition = $3,
      date_modified = $4,
      keep_studying = $5
    WHERE id = $6
    RETURNING *
  `,
    [flashcard.user_id, flashcard.term, flashcard.definition, flashcard.date_modified, flashcard.keep_studying, id]
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

module.exports = Flashcard;

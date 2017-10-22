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

Flashcard.findByUserSubject = (user_id, subject_id) => {
  return db.query(
    `
    SELECT * FROM flashcards
    LEFT OUTER JOIN users_flashcards ON flashcards.id = users_flashcards.flashcard_id
    LEFT OUTER JOIN flashcards_subjects ON flashcards.id = flashcards_subjects.flashcard_id
    WHERE users_flashcards.user_id = $1 AND flashcards_subjects.subject_id = $2
  `,
    [user_id, subject_id]
  );
};


Flashcard.showByUserSubjectHardOnes = (user_id, subject_id) => {
  console.log('in showByUserSubjectHardOnes model----> ', user_id, subject_id)
  return db.query(
    `
    SELECT * FROM flashcards
    LEFT OUTER JOIN users_flashcards ON flashcards.id = users_flashcards.flashcard_id
    LEFT OUTER JOIN flashcards_subjects ON flashcards.id = flashcards_subjects.flashcard_id
    WHERE users_flashcards.user_id = $1 AND flashcards_subjects.subject_id = $2 AND keep_studying = true
    `, [user_id, subject_id]
  )
}






Flashcard.create = flashcard => {
  return db.one(
    `
    INSERT INTO flashcards
    (user_id, term, definition, date_modified)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    RETURNING *
  `,
    [flashcard.user_id, flashcard.term, flashcard.definition]
  );
  return tempFlashcard;
};

Flashcard.update = (flashcard, id) => {
  return db.one(
    `
    UPDATE flashcards SET
      user_id = $1,
      term = $2,
      definition = $3,
      date_modified = CURRENT_TIMESTAMP,
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



Flashcard.updateKeepStudying = id => {
  console.log('model method updateKeepStudying hit!')
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

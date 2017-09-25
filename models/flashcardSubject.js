const db = require('../db/config');
const FlashcardSubject = {};
FlashcardSubject.create = flashcard => {
  return db.one(
    `
    INSERT INTO flashcards_subjects
    (flashcard_id,subject_id)
    VALUES ($1, $2)
    RETURNING *
  `,
    [flashcard.flashcard_id, flashcard.subject_id]
  );
};

module.exports = FlashcardSubject;

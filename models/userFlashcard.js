const db = require('../db/config');
const UserFlashcard = {};
UserFlashcard.create = flashcard => {
  return db.one(
    `
    INSERT INTO users_flashcards
    (user_id, flashcard_id)
    VALUES ($1, $2)
    RETURNING *
  `,
    [flashcard.user_id, flashcard.flashcard_id]
  );
};

module.exports = UserFlashcard;

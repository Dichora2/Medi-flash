const express = require('express');
const flashcardRouter = express.Router();

const flashcardController = require('../controllers/flashcard-controller');

flashcardRouter.get('/', flashcardController.index);
flashcardRouter.post('/', flashcardController.create);

flashcardRouter.get('/:id', flashcardController.show);
flashcardRouter.put('/:id', flashcardController.update);
flashcardRouter.delete('/:id', flashcardController.destroy);

module.exports = flashcardRouter;

const express = require('express');
const flashcardRouter = express.Router();

const flashcardController = require('../controllers/flashcard-controller');
const flashcardHelper = require('../services/flashcard/flashcard-helper');

flashcardRouter.get('/', flashcardController.index);
flashcardRouter.post('/', flashcardController.create);

flashcardRouter.get('/:id', flashcardController.show);
flashcardRouter.put('/:id', flashcardController.update);
flashcardRouter.delete('/:id', flashcardController.destroy);

flashcardRouter.get('/term/:term', flashcardHelper.getDefinitionFromAPI, flashcardController.sendApiDefinition);

module.exports = flashcardRouter;

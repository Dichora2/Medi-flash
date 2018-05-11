const express = require('express');
const flashcardRouter = express.Router();

const flashcardController = require('../controllers/flashcard-controller');
const flashcardHelper = require('../services/flashcard/flashcard-helper');

flashcardRouter.post('/', flashcardController.create);

flashcardRouter.get('/:id', flashcardController.show);
flashcardRouter.get('/subject/:subject_id', flashcardController.showBySubject);

flashcardRouter.get('/subject/:subject_id/hardones', flashcardController.showBySubjectHardOnes);
flashcardRouter.put('/:id/updateKeepStudying', flashcardController.updateKeepStudying)


flashcardRouter.put('/:id', flashcardController.update);
flashcardRouter.delete('/:id', flashcardController.destroy);

flashcardRouter.get('/term/:term', flashcardHelper.getDefinitionFromAPI);

module.exports = flashcardRouter;

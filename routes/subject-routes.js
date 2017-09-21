const express = require('express');
const subjectsRouter = express.Router();
const subjectController = require('../controllers/subjects-controller');

subjectsRouter.get('/', subjectController.index);
subjectsRputer.post('/', subjectController.create);
subjectsRouter.get('/:id/edit', subjectController.edit);
subjectsRouter.put('/:id', subjectController.update);
subjectsRouter.delete('/:id', subjectController.destroy);


module.exports = subjectsRouter;

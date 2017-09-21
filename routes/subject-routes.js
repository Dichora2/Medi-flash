const express = require('express');
const subjectsRouter = express.Router();
const subjectController = require('../controllers/subjects-controller');

subjectsRouter.get('/', subjectController.index);
subjectsRouter.post('/', subjectController.create);
subjectsRouter.get('/:id/edit', subjectController.update);
subjectsRouter.put('/:id', subjectController.update);
subjectsRouter.delete('/:id', subjectController.destroy);


module.exports = subjectsRouter;

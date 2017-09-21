const express = require('express');
const subjectsRouter = express.Router();
const subjectsController = require('../controllers/subjects-controller');

subjectsRouter.get('/', subjectsController.index);
subjectsRouter.post('/', subjectsController.create);
subjectsRouter.get('/:id/edit', subjectsController.update);
subjectsRouter.put('/:id', subjectsController.update);
subjectsRouter.delete('/:id', subjectsController.destroy);

module.exports = subjectsRouter;

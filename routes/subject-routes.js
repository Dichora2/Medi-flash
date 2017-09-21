const express = require('express');
const subjectsRouter = express.Router();
const subjectsController = require('../controllers/subjects-controller');

subjectsRouter.get('/', subjectsController.index);
subjectsRputer.post('/', subjectsController.create);
subjectsRouter.get('/:id/edit', subjectsController.edit);
subjectsRouter.put('/:id', subjectsController.update);
subjectsRouter.delete('/:id', subjectsController.destroy);

module.exports = subjectsRouter;
const express = require('express');
const subjectsRouter = express.Router();
const subjectController = require('../controllers/subjects-controller');

subjectsRouter.get('/user/:id', subjectController.indexUser);
subjectsRouter.get('/:id', subjectController.show);
subjectsRouter.post('/', subjectController.create);
subjectsRouter.put('/:id', subjectController.update);
subjectsRouter.delete('/:id', subjectController.destroy);


module.exports = subjectsRouter;

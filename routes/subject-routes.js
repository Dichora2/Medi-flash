const express = require('express');
const subjectsRouter = express.Router();
const subjectController = require('../controllers/subjects-controller');
const authHelpers = require('../services/auth/auth-helpers')

subjectsRouter.get('/user/:id', subjectController.indexUser);
subjectsRouter.get('/', subjectController.index);
subjectsRouter.get('/:id', subjectController.show);
subjectsRouter.post('/', subjectController.create);
subjectsRouter.get('/:id/edit', subjectController.update);
subjectsRouter.put('/:id', subjectController.update);
subjectsRouter.delete('/:id', subjectController.destroy);


module.exports = subjectsRouter;

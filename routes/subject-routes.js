const express = require('express');
const subjectsRouter = express.Router();
const subjectController = require('../controllers/subjects-controller');
const authHelpers = require('../services/auth/auth-helpers')

<<<<<<< HEAD
subjectsRouter.get('/', subjectsController.index);
subjectsRouter.post('/', subjectsController.create);
subjectsRouter.get('/:id/edit', subjectsController.update);
subjectsRouter.put('/:id', subjectsController.update);
subjectsRouter.delete('/:id', subjectsController.destroy);
=======
subjectsRouter.get('/', subjectController.index);
subjectsRouter.post('/', subjectController.create);
subjectsRouter.get('/:id/edit', subjectController.update);
subjectsRouter.put('/:id', subjectController.update);
subjectsRouter.delete('/:id', subjectController.destroy);
>>>>>>> 59b270f6d3f810be7663d933d4d97892107ff3f4


module.exports = subjectsRouter;

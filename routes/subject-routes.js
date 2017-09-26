const express = require('express');
const subjectRouter = express.Router();
const subjectController = require('../controllers/subjects-controller');
const authHelpers = require('../services/auth/auth-helpers')

subjectRouter.get('/user/:id', subjectController.indexUser);
subjectRouter.get('/', subjectController.index);
subjectRouter.get('/:id', subjectController.show);
subjectRouter.post('/', subjectController.create);
//subjectsRouter.get('/:id/edit', subjectController.update);
subjectRouter.put('/:id', subjectController.update);
subjectRouter.delete('/:id', subjectController.destroy);


module.exports = subjectRouter;

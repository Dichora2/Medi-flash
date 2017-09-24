const Flashcard = require('../models/flashcard');

const flashcardController = {};

flashcardController.index = (req, res) => {
  Flashcard.findAll()
    .then(flashcards => {
      res.json({
        message: 'ok',
        data: flashcards,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

flashcardController.show = (req, res) => {
  Flashcard.findById(req.params.id)
    .then(flashcard => {
      res.json({
        message: 'ok',
        data: flashcard,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

flashcardController.showByUserSubject = (req, res) => {
  Flashcard.findByUserSubject(req.params.user_id,req.params.subject_id)
    .then(flashcard => {
      res.json({
        message: 'ok',
        data: flashcard,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

flashcardController.create = (req, res) => {
  Flashcard.create({
    user_id: req.body.user_id,
    term: req.body.term,
    definition: req.body.definition,
    date_modified: req.body.date_modified,
    keep_studying: req.body.keep_studying,
  })
    .then(flashcard => {
      res.json({
        message: 'ok',
        data: flashcard,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

flashcardController.update = (req, res) => {
  Flashcard.update(
    {
      user_id: req.body.user_id,
      term: req.body.term,
      definition: req.body.definition,
      date_modified: req.body.date_modified,
      keep_studying: req.body.keep_studying,
    },
    req.params.id
  )
    .then(flashcard => {
      res.json({
        message: 'ok',
        data: flashcard,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

flashcardController.destroy = (req, res) => {
  Flashcard.destroy(req.params.id)
    .then(flashcard => {
      res.json({
        message: 'ok',
        data: flashcard,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

flashcardController.sendApiDefinition = (req, res) => {
  res.json({
    message: `Definition for ${req.params.term}`,
    weather: res.locals.definition,
  })
}

module.exports = flashcardController;

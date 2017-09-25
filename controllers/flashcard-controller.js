const Flashcard = require('../models/flashcard');
const UserFlashcard = require('../models/userFlashcard');
const FlashcardSubject = require('../models/flashcardSubject');

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
  let flashcardData = {};
  Flashcard.create({
    subject_id: req.body.subject_id,
    user_id: req.body.user_id,
    term: req.body.term,
    definition: req.body.definition,
  })
    .then(flashcard => {
      console.log('flashcard = ',flashcard);
      flashcardData = flashcard;
      UserFlashcard.create({
        user_id: req.body.user_id,
        flashcard_id: flashcardData.id
      })
        .then(flashcard => {
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ err });
        });
      FlashcardSubject.create({
        subject_id: req.body.subject_id,
        flashcard_id: flashcardData.id
      })
        .then(flashcard => {
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ err });
        });
    })
    .catch(err => {
      console.log('in error',err);
      res.status(500).json({ err });
    });
  res.json({
    data: flashcardData,
    message: 'ok',
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
  console.log(res.locals.definition);
  res.json({
    header: `Definition for ${req.params.term}`,
    definition: res.locals.definition,
  })
}

module.exports = flashcardController;

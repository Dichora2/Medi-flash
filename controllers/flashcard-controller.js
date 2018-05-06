const Flashcard = require('../models/flashcard');

const flashcardController = {};

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

flashcardController.showBySubject = (req, res) => {
  Flashcard.showBySubject(req.params.subject_id)
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

flashcardController.showBySubjectHardOnes = (req, res) => {
  Flashcard.showBySubjectHardOnes(req.params.subject_id)
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


//this is the sontroller to update the true and false for keep_studying

flashcardController.updateKeepStudying = (req, res) => {
  console.log('Req.params.id = ',req.params.id);
  Flashcard.updateKeepStudying(req.params.id)
  .then (flashcard => {
    console.log('flashcard = ',flashcard);
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
    subject_id: req.body.subject_id,
    term: req.body.term,
    definition: req.body.definition,
  })
    .then(data => {
      res.json({
        data: data,
        message: 'ok',
      });
    })
    .catch(err => {
      console.log('in error',err);
      res.status(500).json({ err });
    });
};

flashcardController.update = (req, res) => {
  Flashcard.update(
    {
      term: req.body.term,
      definition: req.body.definition,
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
    header: `Definition for ${req.params.term}`,
    definition: res.locals.definition,
  })
}

module.exports = flashcardController;

const subject = require('../models/subject');

const subjectController = {};

subjectController.index = (req, res) => {
  subject.findAll()
    .then(subject => {
      res.json({
        data: subject,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

subjectController.show = (req, res) => {
  subject.findById(req.params.id)
    .then(subject => {
      res.json({
        data: subject,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

subjectController.create = (req, res) => {
  subject.create({
    user_id: req.body.user_id,
    term: req.body.term,
    definition: req.body.definition,
    date_modified: req.body.date_modified,

  })
    .then(subject => {
      res.json({
        data: subject,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

subjectController.update = (req, res) => {
  subject.update(
    {
      user_id: req.body.user_id,
      term: req.body.term,
      definition: req.body.definition,
      date_modified: req.body.date_modified,
    },
    req.params.id,
  )
    .then(subject => {
      res.json({
        data: subject,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

subjectController.destroy = (req, res) => {
  subject.destroy(req.params.id)
    .then(subject => {
      res.json({
        data: subject,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

module.exports = subjectController;

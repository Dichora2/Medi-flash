const Subject = require('../models/subjects');

const subjectController = {};

subjectController.index = (req, res) => {
  Subject.findAll()
    .then(subjects => {
      res.json({
        data: subjects,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

subjectController.show = (req, res) => {
  Subject.findById(req.params.id)
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
  Subject.create({
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
  Subject.update(
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
  Subject.destroy(req.params.id)
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
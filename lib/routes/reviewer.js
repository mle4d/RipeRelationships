const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      company
    } = req.body;

    Reviewer
      .create({
        name,
        company
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .select({ _id: true, name: true })
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
    //.populate('review')
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndDelete(req.params.id)
      .select({ _id: true, name: true })
      .then(reviewers => res.send(reviewers))
      .catch(next);
  });

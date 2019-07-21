const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');
const Film = require('../models/Film');

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
  // .get('/:id', (req, res, next) => {
  //   Promise.all([
  //     Reviewer.findById(req.params.id)
  //       .select({ __v: false }),
  //     Review.find({ reviewer: req.params.id })
  //       .populate('Film', { _id: true, title: true })
  //       .select({ __v:false, createdAt: false, updatedAt: false, reviewer: false })
  //   ])
  //     .then(([reviewer, reviews]) => {
  //       res.send({ ...reviewer.toJSON(), reviews });
  //     })
  //     .catch(next);
  // })

  .put('/:id', (req, res, next) => {
    const {
      name,
      company
    } = req.body;
    Reviewer
      .findByIdAndUpdate(req.params.id, {
        name,
        company
      }, { 
        new: true 
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });


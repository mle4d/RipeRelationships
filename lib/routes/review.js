const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      rating,
      reviewer,
      review,
      film
    } = req.body;

    Review
      .create({
        rating,
        reviewer,
        review,
        film
      })
      .then(review => res.send(review))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Review
      .find()
      .select({ __createdAt: false, updatedAt: false, reviewer: false, __v: false  })
      .then(reviews => res.send(reviews))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Review
      .findByIdWithFilms(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });

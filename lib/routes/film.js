const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title,
      studio,
      release,
      cast
    } = req.body;

    Film
      .create({
        title,
        studio,
        release,
        cast
      })
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ _id: true, title: true })
      .then(films => res.send(films))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    // Promise.all([
    Film
    //   .findById(req.params.id)
    //   .populate('studio', {_id: true, name: true})
    //   .populate('cast.actor', {name: true, _id:true })
      .select({
        release: false,  
        studio: false, 
        cast: false
      })
      .then(film => res.send(film))
      .catch(next);
    // ])
  })
  .delete('/:id', (req, res, next) => {
    Film
      .findByIdAndDelete(req.params.id)
      .select({ _id: true, title: true })
      .then(films => res.send(films))
      .catch(next);
  });

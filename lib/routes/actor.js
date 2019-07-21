const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      dob,
      pob
    } = req.body;

    Actor
      .create({
        name,
        dob,
        pob
      })
      .then(actor => res.send(actor))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({ _id: true, name: true })
      .then(actors => res.send(actors))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Actor
      .findByIdWithFilms(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const {
      name,
      dob,
      pob
    } = req.body;
    Actor
      .findByIdAndUpdate(req.params.id, {
        name,
        dob,
        pob
      }, { 
        new: true 
      })
      .then(actor => res.send(actor))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .then(studio => {
        if(studio.films === 0) {
          Actor
            .findByIdAndDelete(req.params.id)
            .then(actor => res.send(actor));
        } else {
          const err = new Error('cannot delete');
          err.status = 405;
          next(err);
        }
      })
      .catch(next);
  });


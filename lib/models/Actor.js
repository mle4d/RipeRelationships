const mongoose = require('mongoose');

const actorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: false
  },
  pob: {
    type: String,
    required: false
  }
});

actorSchema.statics.findByIdWithFilms = function(id) {
  return Promise.all([
    this.findById(id).select({ __v: false, _id: false }),
    this.model('Film').find({ 'cast.actor': id }).select({ title: true, _id: true, release: true })
  ])
    .then(([actor, film]) => {
      return { ...actor.toJSON(), film };
    });
};


module.exports = mongoose.model('Actor', actorSchema);

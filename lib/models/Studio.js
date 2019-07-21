const mongoose = require('mongoose');

const studioSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    city: String,
    state: String,
    country: String
  }
});
studioSchema.statics.findByIdWithFilms = function(id) {
  return Promise.all([
    this.findById(id).select({ __v: false, status: false, message: false }),
    this.model('Film').find({ studio: id }).select({ title: true, _id: true })
  ])
    .then(([studio, films]) => {
      return { ...studio.toJSON(), films };
    });
};


module.exports = mongoose.model('Studio', studioSchema);

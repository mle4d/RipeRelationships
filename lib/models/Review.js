const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    max: 5,
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String, 
    maxLength: 140,
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});
module.exports = mongoose.model('Review', reviewSchema);

// reviewSchema.statics.findByIdWithFilms = function(id) {
//{ timestamps: true });
//   return Promise.all([
//     this.findById(id).select({ __v: false }),
//     this.model('Film').find({ review: id }).select({ title: true, _id: true })
//   ])
//     .then(([review, films]) => {
//       return { ...review.toJSON(), films };
//     });
// };



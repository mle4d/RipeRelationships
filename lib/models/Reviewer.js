const mongoose = require('mongoose');

const reviewerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
});
// reviewerSchema.statics.findByIdWithReviewer = function(id) {
//   return Promise.all([
//     this.findById(id)
//       .select({ _id: true, name: true, company: true }),
//     this.model('Review').find({ reviewer: id })
//       .populate('film', { _id: true, title: true })
//       .select({ _id: true, rating: true, review: true })
//   ])
//     .then(([reviewer, review]) => {
//       return { ...reviewer.toJSON(), review };
//     });
// };

module.exports = mongoose.model('Reviewer', reviewerSchema);

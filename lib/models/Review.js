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


//{ timestamps: true });




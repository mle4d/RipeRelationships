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


module.exports = mongoose.model('Actor', actorSchema);

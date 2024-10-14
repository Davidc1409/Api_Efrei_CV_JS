const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String
  },
  experiencesPedagogiques: {
    type: String,
    required: true
  },
  experiencesProfessionnelles: {
    type: String,
    required: true
  },
  visibility: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('CV', CvSchema);
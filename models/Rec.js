const mongoose=require('mongoose');
const RecSchema = new mongoose.Schema({
    cvId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CV',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    RecAuthor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
  });

  module.exports = mongoose.model('Recommendation', RecSchema);
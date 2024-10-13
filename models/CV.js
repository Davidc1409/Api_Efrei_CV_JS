const mongoose=require('mongoose');
const CvSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    contact: {
      type: String
    },
    isVisible : {
      type: Boolean,
      required : true
    },
    experiencesPedagogiques: [
      {
        title: {
          type: String
        },
        description: {
          type: String
        },
        startDate: {
          type: Date
        },
        endDate: {
          type: Date
        }
      }
    ],
    experiencesProfessionnelles: [
      {
        title: {
          type: String
        },
        description: {
          type: String
        },
        startDate: {
          type: Date
        },
        endDate: {
          type: Date
        }
      }
    ]
  });

  module.exports=mongoose.model('CV',CvSchema);
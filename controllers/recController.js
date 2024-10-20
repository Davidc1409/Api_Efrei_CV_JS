const { verifyRec } = require('../validators/recValidator');
const RecModel=require('../models/Rec');
const UserModel = require('../models/User');

exports.create = async (req, res) => {
    const cvId = req.params.id;
    const text = req.body.text;
    const recAuthor = req.user._id; 
    const rec = { text };

    verifyRec(rec, cvId, recAuthor); 
    const userList = await UserModel.find(recAuthor);
    const newRecommendation = new RecModel({ 
      cvId,
      text,
      RecAuthor: recAuthor
    });
    const user = userList[0];
    newRecommendation.save()
    .then(() => {
      res.status(201).send({
        _id : newRecommendation._id,
        cvId : newRecommendation.cvId, 
        text: newRecommendation.text,
        recAuthor : {
          id : recAuthor,
          surname : user.surname,
          lastname : user.lastname
        }  
      });
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message || 'Error while saving the recommendation.'
      });
    });
  };

  exports.getAll = (req, res) => {
    const cvId = req.params.id;
  
    RecModel.find({ cvId: cvId })
    .populate('RecAuthor', 'surname lastname') 
    .populate({
      path: 'cvId', 
      populate: {
        path: 'author', 
        select: 'surname lastname', 
      },
    })
    .then((recommendations) => {
      res.status(200).send(recommendations);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Error retrieving recommendations.'
      });
    });
  };
const { verifyCV } = require('../validators/cvValidator');
const CvModel = require('../models/CV');
const UserModel = require('../models/User');

exports.create = async (req, res) => {
  try {

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ message: 'User  not found' });
    }

    const cvData = {

        description: req.body.description,
  
        experiencesPedagogiques: req.body.experiencesPedagogiques,
  
        experiencesProfessionnelles: req.body.experiencesProfessionnelles,
        visibility: req.body.visibility,
  
        author: user._id
  
      };
  
  
      verifyCV(cvData, user._id); 
  
      const newCV = new CvModel(cvData);
    await newCV.save();

    const { _id, description, author, experiencesPedagogiques, experiencesProfessionnelles,visibility } = newCV;
    res.status(201).send({
      id: _id,
      description,
      author: {
        id: author._id,
        surname: author.surname,
        lastname: author.lastname
      },
      experiencesPedagogiques,
      experiencesProfessionnelles,
      visibility
    });
  } catch (error) {
    res.status(400).send({
      message: error.message || 'Something Wrong'
    });
  }
};

exports.getAll = async(req, res) => {
    
     await CvModel.find({ visibility: true }).populate("author", "surname lastname")
      .then((cvs)=>{
        res.send(cvs);
      })
    .catch ((error) =>{
      res.status(500).send({
        message: error.message
      });
    });
  };
  
  exports.getOne = async (req, res) => {
    
    CvModel.findById(req.params.id).where({ visibility: true }).populate("author", "surname lastname")
      .then((cv)=>{
        res.send(cv);
      })
      .catch ((error) =>{
      res.status(500).send({
        message: error.message
      });
    });
  };

  exports.update = async (req, res) => {
    const cvId = req.params.id;
    const cv = await CvModel.findById(cvId);
    if (!cv) {
      throw new Error('Cannot find CV to update');
    }
    const newCv = { ...cv, ...req.body };
  
    verifyCV(newCv, req.user.id);
    const { description, experiencesPedagogiques, experiencesProfessionnelles,visibility} = newCv;
    CvModel.findByIdAndUpdate(
      cvId,
      {
        description,
        experiencesPedagogiques,
        experiencesProfessionnelles,
        visibility
      },
      { new: true }
    )
      .then((updateCv) => {
        res.send(updateCv);
      })
      .catch((error) => {
        res.status(500).send(error.message || `Cannot update CV with id=${cvId}`);
      });
  };

  exports.delete = (req, res) => {
    const cvId = req.params.id;
    CvModel.findByIdAndDelete(cvId)
      .then((cv) => {
        res.send({
          message: `CV with id=${cv.id} was successfully deleted`
        });
      })
      .catch((error) => {
        res.status(500).send(error.message || `Cannot delete CV with id=${cvId}`);
      });
  };

exports.updateVisibility = async (req, res) => {
    try {
      const cv = await CvModel.findById(req.params.id);
      if (!cv) {
        return res.status(404).send({ message: 'CV not found' });
      }
      cv.visibility = req.body.visibility;
      await cv.save();
      res.send({ message: 'CV visibility updated successfully' });
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  };
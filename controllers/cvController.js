const CvModel = require('./../models/CV');
const UserModel = require('./../models/User');
const { verifyCV } = require('../validators/cvValidator');

module.exports = {
    // requete POST / pour creer un CV
    create: async (req, res) => {
        try {
            verifyCV(req.body);
            const user = await UserModel.findById(req.body.userId);
            if (!user) {
                res.status(400).send({
                    message: 'User not exist'
                });
            }
            const newCv = new CvModel({
                lastname: req.body.lastname,
                firstname : req.body.firstname,
                contact : req.body.contact,
                description: req.body.description,
                experiencesPedagogiques : req.body.experiencesPedagogiques,
                experiencesProfessionnelles : req.body.experiencesProfessionnelles,
                isVisible : req.body.isVisible,
                user
            });
            newCv.save();
            const { _id, lastname, firstname, contact, description, isVisible,experiencesPedagogiques, experiencesProfessionnelles, user : userCv } = newCv;
            res.status(201).send({
                id: _id,
                lastname,
                firstname,
                isVisible,
                description,
                user : {
                    id: userCv._id,
                    surname: userCv.surname,
                    lastname: userCv.lastname
                }
            });
        } catch (error) {
            res.status(400).send({
                message: error.message || 'Something Wrong'
            });
        }
    },

    // requete GET / pour recuperer l'ensemble d'un cv
    findAll: (req, res) => {
        CvModel.find()
            .then((cv) => {
                res.send(cv);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            });
    },

    // requete GET /:id pour récupere un cv
    findCv: (req, res) => {
        const cvId = req.params.id;
        CvModel.findById(cvId)
            .then((cv) => {
                res.send(cv);
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot find cv with id=${cvId}`);
            });
    },

    // requete PUT /:id mettre a jour un cv
    updateCv: async (req, res) => {
        const cvId = req.params.id;
        const cv = await CvModel.findById(cvId);
        if (!cv) {
            throw new Error('Cannot find cv to update');
        }
        const newCv = { ...cv, ...req.body };

        verifyCV(newCv);
        const {lastname, firstname, contact, description, isVisible,experiencesPedagogiques, experiencesProfessionnelles} = newCv;
        CvModel.findByIdAndUpdate(
            cvId,
            {
                lastname, 
                firstname, 
                contact, 
                description, 
                isVisible, 
                experiencesPedagogiques, 
                experiencesProfessionnelles
            },
            { new: true }
        )
            .then((updatedCv) => {
                res.send(updatedCv);
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot update cv with id=${cvId}`);
            });
    },

    // requete DELETE /:id Supprimer un cv
    deleteBook: (req, res) => {
        const cvId = req.params.id;
        CvModel.findByIdAndDelete(cvId)
            .then((cv) => {
                res.send({
                    message: `Cv with id=${cv.id} was successfully delete`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete cv with id=${cvId}`);
            });
    }
};

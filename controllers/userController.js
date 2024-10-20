const CvModel = require('./../models/CV');
const mongoose = require('mongoose');

module.exports = {
    getUserInfo: (req, res) => {
        const { id, surname, lastname, email } = req.user;
        res.send({
            id,
            surname,
            lastname,
            email
        });
    },

    getUserCV: async (req, res) => {
        console.log(req.user.id)
        const cv = await CvModel
            .find({
                author: new mongoose.Types.ObjectId(req.user.id)
            })
            .populate('author');

        res.send(cv);
    }
};

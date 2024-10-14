const jwt = require('jsonwebtoken');
const Cv = require('../models/CV');
const UserModel = require('../models/User');

module.exports = (req, res, next) => {
  // Récupère le token depuis les headers
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ message: 'No token provided.' });
  }
  token = token.replace('Bearer ', '');
  // Vérifie et décode le token
  const { userId } = jwt.verify(token, process.env.JWT_SECRET || 'secret');


    // Récupère l'utilisateur à partir de l'ID extrait du token
    UserModel.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User not found.' });
        }

        // Récupère le CV correspondant à l'ID dans les paramètres de la requête
        const cvId = req.params.id;
        return Cv.findById(cvId)
          .then(cv => {
            if (!cv) {
              return res.status(404).send({ message: 'CV not found.' });
            }

            // Vérifie si l'utilisateur est l'auteur du CV
            if (cv.author.toString() === user._id.toString()) {
              return res.status(403).send({
                message: 'You do not have permission to add a recommendation to your own CV.'
              });
            }

            req.user = user;  
            next();
          });
      })
      .catch(error => {
        return res.status(500).send({ message: error.message || 'An error occurred.' });
      });
  };

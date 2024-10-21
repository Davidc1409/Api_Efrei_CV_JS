const jwt = require('jsonwebtoken');
const UserModel = require('./../models/User');

module.exports = {
    verifyUser: async (req, res, next) => {
        let token = req.headers['authorization'];
        if (!token) {
            res.status(401).send({
                message: 'Unauthorized user'
            });
        }

        token = token.replace('Bearer ', '');

        //Decryptage du token
        try{
            const { userId } = jwt.verify(token, process.env.JWT_SECRET || 'secret') || {};
            if(!userId){
                res.status(404).send({message: "Invalid token"});
                return;
            }
            const user = await UserModel.findById(userId);
            req.user = user;
            if (!req.user) {
                res.status(401).send({
                    message: 'Unauthorized user'
                });
            }
        }
        catch(error){
            res.status(500).send({message : error})
            return;
        }
        next();
    }
};

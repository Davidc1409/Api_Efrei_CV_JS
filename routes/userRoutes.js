const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyUser } = require('../middlewares/auth');

router.get('/me', verifyUser, userController.getUserInfo);

router.get('/cv', verifyUser, userController.getUserCV);

module.exports = router;
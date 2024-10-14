const express = require('express');
const router = express.Router();
const recController = require('../controllers/recController');
const verifyAddRec=require('../middlewares/VerifyAddRec')

// Recommendation routes
router.post('/:id/recommendation', verifyAddRec , recController.create);
router.get('/:id/recommendations', recController.getAll);

module.exports = router;
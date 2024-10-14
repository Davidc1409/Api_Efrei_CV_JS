const express = require('express');
const router = require('express').Router();
const cvController = require('../controllers/cvController');
const auth = require('../middlewares/auth');

// CV routes
router.post('/', auth.verifyUser , cvController.create);
router.get('/', cvController.getAll);
router.get('/:id', cvController.getOne);
router.put('/:id', auth.verifyUser , cvController.update);
router.delete('/:id', auth.verifyUser , cvController.delete);
router.patch('/:id', auth.verifyUser  , cvController.updateVisibility);

module.exports = router;
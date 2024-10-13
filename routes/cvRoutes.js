const express = require('express');
const router = require('express').Router();
const cvController = require('../controllers/cvController');

router.post('/', cvController.create);
router.get('/', cvController.findAll);
router.get('/:id', cvController.findCv);
router.put('/:id', cvController.updateCv);
router.delete('/:id', cvController.deleteCv);

module.exports = router;
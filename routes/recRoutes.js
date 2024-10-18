const express = require('express');
const router = express.Router();
const recController = require('../controllers/recController');
const verifyAddRec=require('../middlewares/VerifyAddRec')


// Recommendation routes
router.post('/:id/recommendation', verifyAddRec , recController.create);

/**
 * @swagger
 * /api/recommendation/:id/recommendations:
 *   get:
 *     summary: Déconnexion  de l'utilisateur
 *     tags:
 *       - Recommandations
 *     responses:
 *       200:
 *         description: Liste des recommandations du CV
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 */
router.get('/:id/recommendations', recController.getAll);

module.exports = router;
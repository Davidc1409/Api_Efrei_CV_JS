const express = require('express');
const router = express.Router();
const recController = require('../controllers/recController');
const verifyAddRec=require('../middlewares/VerifyAddRec')

/**
 * @swagger
 * /api/recommendation/:id/recommendations:
 *   post:
 *     summary: Ajout de recommandation
 *     tags:
 *       - Recommandations
 *     responses:
 *       200:
 *         description: Ajout de recommandations du CV
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 */
// Recommendation routes
router.post('/:id/recommendation', verifyAddRec , recController.create);

/**
 * @swagger
 * /api/recommendation/:id/recommendations:
 *   get:
 *     summary: Récupérer les recommandations 
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
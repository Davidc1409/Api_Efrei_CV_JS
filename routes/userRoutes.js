const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyUser } = require('../middlewares/auth');

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Récupérer les infos de  l'utilisateur
 *     tags:
 *       - Utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Infos obtenues 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erreur de validation
 */
router.get('/me', verifyUser, userController.getUserInfo);
/**
 * @swagger
 * /api/user/cv:
 *   get:
 *     summary: Récupérer le CV de l'utilisateur
 *     tags:
 *       - Utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: CV récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       400:
 *         description: Erreur de validation
 */
router.get('/cv', verifyUser, userController.getUserCV);

module.exports = router;
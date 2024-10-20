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
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: a valid email address
 *                 example: "email@email.com ?"
 *               password : 
 *                 type : string
 *                 description : Le mot de passe doit comporter au moins une majuscule et un chiffre
 *                 expample : "Azerty123"
 *     responses:
 *       201:
 *         description: Infos obtenues 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/User'
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
 *             $ref: '#/models/CV'
 *     responses:
 *       201:
 *         description: CV récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/CV'
 *       400:
 *         description: Erreur de validation
 */
router.get('/cv', verifyUser, userController.getUserCV);

module.exports = router;
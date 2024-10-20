const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - surname
 *               - lastname
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse email valide
 *                 example: "email@email.com"
 *               password:
 *                 type: string
 *                 description: Le mot de passe doit comporter au moins une majuscule et un chiffre
 *                 example: "Azerty123"
 *               surname:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 description: Nom de famille de l'utilisateur
 *                 example: "Doe"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */


router.post('/register', authController.register);
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags:
 *       - Authentification
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
 *                 description: Adresse email valide
 *                 example: "email@email.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *                 example: "Azerty123"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyshdgshfhjsfklskfkfkflkfkf..."
 *                 userId:
 *                   type: string
 *                   description: ID de l'utilisateur
 *                 email:
 *                   type: string
 *                   example: "email@email.com"
 *       401:
 *         description: Identifiants invalides
 */

router.post('/login', authController.login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     tags:
 *       - Authentification
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       400:
 *         description: Erreur lors de la déconnexion
 */

router.post('/logout', authController.logout);

module.exports = router;
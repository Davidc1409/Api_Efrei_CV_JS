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
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/User'
 *       400:
 *         description: Erreur de validation
 */
router.post('/register', authController.register);
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/User'
 *     responses:
 *       201:
 *         description: Utilisateur authentifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/User'
 *       400:
 *         description: Erreur de validation
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Déconnexion  de l'utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/User'
 *     responses:
 *       201:
 *         description: Utilisateur déconnecté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/User'
 *       400:
 *         description: Erreur de validation
 */
router.post('/logout', authController.logout);

module.exports = router;
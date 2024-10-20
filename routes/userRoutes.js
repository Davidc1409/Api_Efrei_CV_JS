const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyUser } = require('../middlewares/auth');

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags:
 *       - Utilisateur
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID unique de l'utilisateur
 *                   example: "615f8e2c4e1c3e6a9a9e9b1a"
 *                 surname:
 *                   type: string
 *                   description: Prénom de l'utilisateur
 *                   example: "Dupont"
 *                 lastname:
 *                   type: string
 *                   description: Nom de l'utilisateur
 *                   example: "Jean"
 *                 email:
 *                   type: string
 *                   description: Adresse e-mail de l'utilisateur
 *                   example: "email@email.com"
 *       401:
 *         description: Non autorisé (utilisateur non authentifié)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Unauthorized"
 */

router.get('/me', verifyUser, userController.getUserInfo);
/**
 * @swagger
 * /api/user/cv:
 *   get:
 *     summary: Récupérer le CV de l'utilisateur connecté
 *     tags:
 *       - Utilisateur
 *     responses:
 *       200:
 *         description: CV récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID de l'auteur
 *                     surname:
 *                       type: string
 *                       description: Prénom de l'auteur
 *                     lastname:
 *                       type: string
 *                       description: Nom de l'auteur
 *                 description:
 *                   type: string
 *                   description: Description du CV
 *                 experiencesPedagogiques:
 *                   type: string
 *                   description: Expériences pédagogiques
 *                 experiencesProfessionnelles:
 *                   type: string
 *                   description: Expériences professionnelles
 *                 visibility:
 *                   type: boolean
 *                   description: Visibilité du CV
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur serveur
 */


router.get('/cv', verifyUser, userController.getUserCV);

module.exports = router;
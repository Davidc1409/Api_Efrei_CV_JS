const express = require('express');
const router = express.Router();
const recController = require('../controllers/recController');
const verifyAddRec=require('../middlewares/VerifyAddRec')

/**
 * @swagger
 * /api/recommendation/{id}/recommendation:
 *   post:
 *     summary: Ajouter une recommandation à un CV
 *     tags:
 *       - Gestion des Recommandations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du CV auquel la recommandation sera ajoutée
 *         example: "615f8e2c4e1c3e6a9a9e9b1a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texte de la recommandation
 *                 example: "Excellent travail et très professionnel."
 *     responses:
 *       201:
 *         description: La nouvelle recommendation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cvId:
 *                   type: string
 *                   description: identifiant du cv
 *                   example: "67153db7c5de97637de159r2"
 *                 text:
 *                   type: string
 *                   description: le contenu de la recommendation
 *                   example: "C'est nul"
 *                 RecAuthor:
 *                   type: object
 *                   properties:
 *                      id:
 *                          type : string
 *                          description: identifiant de l'auteur de la recommendation
 *                          example: "6713a492b6b83845ad4e02nn"
 *                      surname:
 *                          type : string
 *                          description : prénom de l'auteur
 *                          example : "Bertrand"
 *                      lastname :
 *                          type : string
 *                          description: nom de famille de l'auteur
 *                          example : "Dupont"
 *                 _id:
 *                   type: string
 *                   description: identifiant de la recommendation
 *                   example: "67156f2f0d69e7bea012c7er"
 * 
 *       400:
 *         description: Erreur de validation ou problème lors de l'ajout de la recommandation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Error while saving the recommendation."
 */

// Recommendation routes
router.post('/:id/recommendation', verifyAddRec , recController.create);

/**
 * @swagger
 * /api/recommendation/{id}/recommendations:
 *   get:
 *     summary: Récupérer toutes les recommandations d'un CV
 *     tags:
 *       - Gestion des Recommandations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du CV dont on veut récupérer les recommandations
 *         example: "615f8e2c4e1c3e6a9a9e9b1a"
 *     responses:
 *       200:
 *         description: Recommandations récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                     description: Texte de la recommandation
 *                     example: "Excellent travail et très professionnel."
 *                   RecAuthor:
 *                     type: object
 *                     properties:
 *                       surname:
 *                         type: string
 *                         description: Prénom de l'auteur de la recommandation
 *                         example: "Dupont"
 *                       lastname:
 *                         type: string
 *                         description: Nom de l'auteur de la recommandation
 *                         example: "Jean"
 *                   cvId:
 *                     type: object
 *                     properties:
 *                       author:
 *                         type: object
 *                         properties:
 *                           surname:
 *                             type: string
 *                             description: Prénom de l'auteur du CV
 *                             example: "Martin"
 *                           lastname:
 *                             type: string
 *                             description: Nom de l'auteur du CV
 *                             example: "Paul"
 *       500:
 *         description: Erreur lors de la récupération des recommandations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Error retrieving recommendations."
 */

router.get('/:id/recommendations', recController.getAll);

module.exports = router;
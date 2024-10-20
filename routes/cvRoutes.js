const express = require('express');
const router = require('express').Router();
const cvController = require('../controllers/cvController');
const auth = require('../middlewares/auth');

// CV routes
/**
 * @swagger
 * /api/cv:
 *   post:
 *     summary: Créer un nouveau CV
 *     tags:
 *       - Gestion de CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - experiencesPedagogiques
 *               - experiencesProfessionnelles
 *             properties:
 *               author:
 *                 type: string
 *                 description: ID de l'auteur du CV (référence à l'utilisateur)
 *                 example: "60d0fe4f5311236168a109ca"
 *               description:
 *                 type: string
 *                 description: Brève description du CV
 *                 example: "Développeur full-stack avec 3 ans d'expérience"
 *               experiencesPedagogiques:
 *                 type: string
 *                 description: Détails des expériences pédagogiques
 *                 example: "Master en informatique à l'université X"
 *               experiencesProfessionnelles:
 *                 type: string
 *                 description: Détails des expériences professionnelles
 *                 example: "Développeur chez XYZ pendant 2 ans"
 *               visibility:
 *                 type: boolean
 *                 description: Détermine si le CV est visible publiquement ou non
 *                 example: true
 *     responses:
 *       201:
 *         description: CV créé avec succès
 *       400:
 *         description: Erreur de validation des données
 */

router.post('/', auth.verifyUser , cvController.create);

/**
 * @swagger
 * /api/cv:
 *   get:
 *     summary: Récupérer la liste des CV publics
 *     tags:
 *       - Gestion de CV
 *     responses:
 *       200:
 *         description: Liste des CV publics récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: L'ID unique du CV
 *                     example: "615f8e2c4e1c3e6a9a9e9b1a"
 *                   author:
 *                     type: object
 *                     description: Informations de l'auteur du CV
 *                     properties:
 *                       surname:
 *                         type: string
 *                         description: Prénom de l'auteur
 *                         example: "John"
 *                       lastname:
 *                         type: string
 *                         description: Nom de l'auteur
 *                         example: "Doe"
 *                   description:
 *                     type: string
 *                     description: Description du CV
 *                     example: "Développeur full stack avec 3 ans d'expérience"
 *                   experiencesPedagogiques:
 *                     type: string
 *                     description: Expériences pédagogiques de l'utilisateur
 *                     example: "Master en informatique, Université XYZ"
 *                   experiencesProfessionnelles:
 *                     type: string
 *                     description: Expériences professionnelles de l'utilisateur
 *                     example: "3 ans chez TechCorp en tant que développeur full stack"
 *                   visibility:
 *                     type: boolean
 *                     description: Visibilité du CV (public ou privé)
 *                     example: true
 *       500:
 *         description: Erreur interne lors de la récupération des CV
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Une erreur s'est produite lors de la récupération des CV"
 */

router.get('/', cvController.getAll);

/**
 * @swagger
 * /api/cv/{id}:
 *   get:
 *     summary: Récupérer un CV spécifique par ID
 *     tags:
 *       - Gestion de CV
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du CV à récupérer
 *         example: "615f8e2c4e1c3e6a9a9e9b1a"
 *     responses:
 *       200:
 *         description: CV récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: L'ID unique du CV
 *                   example: "615f8e2c4e1c3e6a9a9e9b1a"
 *                 author:
 *                   type: object
 *                   description: Informations de l'auteur du CV
 *                   properties:
 *                     surname:
 *                       type: string
 *                       description: Prénom de l'auteur
 *                       example: "John"
 *                     lastname:
 *                       type: string
 *                       description: Nom de l'auteur
 *                       example: "Doe"
 *                 description:
 *                   type: string
 *                   description: Description du CV
 *                   example: "Développeur full stack avec 3 ans d'expérience"
 *                 experiencesPedagogiques:
 *                   type: string
 *                   description: Expériences pédagogiques de l'utilisateur
 *                   example: "Master en informatique, Université XYZ"
 *                 experiencesProfessionnelles:
 *                   type: string
 *                   description: Expériences professionnelles de l'utilisateur
 *                   example: "3 ans chez TechCorp en tant que développeur full stack"
 *                 visibility:
 *                   type: boolean
 *                   description: Visibilité du CV (public ou privé)
 *                   example: true
 *       404:
 *         description: CV non trouvé 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur indiquant que le CV n'a pas été trouvé
 *                   example: "CV not found" 
 */

router.get('/:id', cvController.getOne);

/**
 * @swagger
 * /api/cv/{id}:
 *   put:
 *     summary: Mettre à jour un CV spécifique
 *     tags:
 *       - Gestion de CV
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du CV à mettre à jour
 *         example: "615f8e2c4e1c3e6a9a9e9b1a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description mise à jour du CV
 *                 example: "Développeur full stack avec 5 ans d'expérience"
 *               experiencesPedagogiques:
 *                 type: string
 *                 description: Expériences pédagogiques mises à jour
 *                 example: "Doctorat en informatique, Université ABC"
 *               experiencesProfessionnelles:
 *                 type: string
 *                 description: Expériences professionnelles mises à jour
 *                 example: "5 ans chez DevTech en tant que lead développeur"
 *               visibility:
 *                 type: boolean
 *                 description: Visibilité mise à jour du CV (public ou privé)
 *                 example: true
 *     responses:
 *       200:
 *         description: CV mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation de la mise à jour
 *                   example: "CV mis à jour avec succès"
 *       400:
 *         description: Erreur de validation lors de la mise à jour du CV
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Données invalides fournies"
 */

router.put('/:id', auth.verifyUser , cvController.update);

/**
 * @swagger
 * /api/cv/{id}:
 *   delete:
 *     summary: Supprimer un CV spécifique
 *     tags:
 *       - Gestion de CV
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du CV à supprimer
 *         example: "615f8e2c4e1c3e6a9a9e9b1a"
 *     responses:
 *       200:
 *         description: CV supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation de la suppression
 *                   example: "CV supprimé avec succès"
 *       404:
 *         description: CV non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur indiquant que le CV n'a pas été trouvé
 *                   example: "CV non trouvé"
 */
router.delete('/:id', auth.verifyUser , cvController.delete);
/**
 * @swagger
 * /api/cv/{id}:
 *   patch:
 *     summary: Mettre à jour la visibilité d'un CV
 *     tags:
 *       - Gestion de CV
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID unique du CV à mettre à jour
 *         example: "615f8e2c4e1c3e6a9a9e9b1a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visibility:
 *                 type: boolean
 *                 description: Visibilité du CV (true pour visible, false pour invisible)
 *                 example: true
 *     responses:
 *       200:
 *         description: Visibilité du CV mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation de la mise à jour
 *                   example: "CV visibility updated successfully"
 *       404:
 *         description: CV non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indiquant que le CV n'a pas été trouvé
 *                   example: "CV not found"
 */

router.patch('/:id', auth.verifyUser  , cvController.updateVisibility);

module.exports = router;
const express = require('express');
const router = require('express').Router();
const cvController = require('../controllers/cvController');
const auth = require('../middlewares/auth');

// CV routes
/**
 * @swagger
 * /api/cv/:
 *   post:
 *     summary: créer son CV
 *     tags:
 *       - Gestion de CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: CV créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', auth.verifyUser , cvController.create);

/**
 * @swagger
 * /api/cv/:
 *   get:
 *     summary: Récuperer la liste de CV
 *     tags:
 *       - Gestion de CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: CVs récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       400:
 *         description: Erreur de validation
 */
router.get('/', cvController.getAll);

/**
 * @swagger
 * /api/cv/:id:
 *   get:
 *     summary: Récupérer un CV spécifique
 *     tags:
 *       - Gestion de CV
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
router.get('/:id', cvController.getOne);

/**
 * @swagger
 * /api/cv/:id:
 *   put:
 *     summary: Modifier un CV
 *     tags:
 *       - Gestion de CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: CV modifié succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       400:
 *         description: Erreur de validation
 */
router.put('/:id', auth.verifyUser , cvController.update);

/**
 * @swagger
 * /api/cv/:id:
 *   delete:
 *     summary: Supprimer un CV
 *     tags:
 *       - Gestion de CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: CV supprimé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       400:
 *         description: Erreur de validation
 */
router.delete('/:id', auth.verifyUser , cvController.delete);
/**
 * @swagger
 * /api/cv/:id:
 *   patch:
 *     summary: Modifier la visibilité du CV
 *     tags:
 *       - Gestion de CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: Utilisateur authentifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       400:
 *         description: Erreur de validation
 */
router.patch('/:id', auth.verifyUser  , cvController.updateVisibility);

module.exports = router;
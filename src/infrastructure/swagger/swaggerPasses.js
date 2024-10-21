// infrastructure/swagger/swaggerPasses.js

/**
 * @swagger
 *  tags:
 *   name: Passes
 *   description: API pour gérer les passes
 *
 * components:
 *   schemas:
 *     Pass:
 *       type: object
 *       required:
 *         - level
 *       properties:
 *         id:
 *           type: string
 *           description: L'identifiant auto-généré du pass
 *         level:
 *           type: integer
 *           description: Le niveau du pass
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La date de création du pass
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière mise à jour du pass
 *       example:
 *         id: 12345678-1234-1234-1234-123456789012
 *         level: 2
 *         createdAt: 2024-10-17T10:00:00Z
 *         updatedAt: 2024-10-17T10:00:00Z
 */

/**
 * @swagger
 * /passes:
 *   post:
 *     summary: Créer un nouveau pass
 *     tags: [Passes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               level:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pass créé avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /passes/{id}:
 *   get:
 *     summary: Récupérer un pass par ID
 *     tags: [Passes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du pass
 *     responses:
 *       200:
 *         description: Pass récupéré avec succès
 *       404:
 *         description: Pass non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /passes:
 *   get:
 *     summary: Récupérer la liste de tous les passes
 *     tags: [Passes]
 *     responses:
 *       200:
 *         description: Liste des passes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pass'
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /passes/{id}:
 *   put:
 *     summary: Mettre à jour un pass
 *     tags: [Passes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du pass à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pass'
 *     responses:
 *       200:
 *         description: Pass mis à jour avec succès
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Pass non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /passes/{id}:
 *   delete:
 *     summary: Supprimer un pass
 *     tags: [Passes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du pass à supprimer
 *     responses:
 *       204:
 *         description: Pass supprimé avec succès
 *       404:
 *         description: Pass non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: API pour gérer le login (récupération token d'authentification)
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Générer un token d'accès
 *     tags: [Login]
 *     requestBody:
 *       required: false  // Changer à false, car aucune information n'est requise
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Token généré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       500:
 *         description: Erreur serveur interne
 */
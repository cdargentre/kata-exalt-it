/**
 * @swagger
 *  tags:
 *   name: Users
 *   description: API pour gérer les utilisateurs
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - age
 *       properties:
 *         id:
 *           type: string
 *           description: L'identifiant auto-généré de l'utilisateur
 *         first_name:
 *           type: string
 *           description: Le prénom de l'utilisateur
 *         last_name:
 *           type: string
 *           description: Le nom de famille de l'utilisateur
 *         age:
 *           type: integer
 *           description: L'âge de l'utilisateur
 *         phone_number:
 *           type: string
 *           description: Le numéro de téléphone de l'utilisateur
 *         address:
 *           type: string
 *           description: L'adresse de l'utilisateur
 *         passId:
 *           type: array
 *           items:
 *             type: string
 *           description: Les ID du pass de l'utilisateur
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La date à laquelle l'utilisateur a été créé
 *       example:
 *         id: 12345678-1234-1234-1234-123456789012
 *         first_name: John
 *         last_name: Doe
 *         age: 30
 *         phone_number: '+123456789'
 *         address: '123 Main St, Anytown, USA'
 *         passId: ['9876543210', '1234567890']
 *         createdAt: 2024-10-17T10:00:00Z
 * 
 *     CreateorEditUser:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - age
 *       properties:
 *         first_name:
 *           type: string
 *           description: Le prénom de l'utilisateur
 *         last_name:
 *           type: string
 *           description: Le nom de famille de l'utilisateur
 *         age:
 *           type: integer
 *           description: L'âge de l'utilisateur
 *         phone_number:
 *           type: string
 *           description: Le numéro de téléphone de l'utilisateur
 *         address:
 *           type: string
 *           description: L'adresse de l'utilisateur
 *         passId:
 *           type: array
 *           items:
 *             type: string
 *           description: Les ID du pass de l'utilisateur
 *       example:
 *         first_name: John
 *         last_name: Doe
 *         age: 30
 *         phone_number: '+123456789'
 *         address: '123 Main St, Anytown, USA'
 *         passId: ['9876543210', '1234567890']
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateorEditUser'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer la liste de tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur récupérés
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateorEditUser'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur à supprimer
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur interne
 */

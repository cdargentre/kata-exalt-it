/**
 * @swagger
 *  tags:
 *    name: Places
 *    description: API pour gérer les lieux (places)
 *
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       required:
 *         - address
 *         - phone_number
 *         - requiredPassLevel
 *         - requiredAgeLevel
 *       properties:
 *         id:
 *           type: string
 *           description: L'identifiant auto-généré du lieu
 *         address:
 *           type: string
 *           description: L'adresse du lieu
 *         phone_number:
 *           type: string
 *           description: Le numéro de téléphone du lieu
 *         requiredPassLevel:
 *           type: integer
 *           description: Le niveau de pass requis pour accéder au lieu
 *         requiredAgeLevel:
 *           type: integer
 *           description: L'âge minimum requis pour accéder au lieu
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La date de création du lieu
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: La date de la dernière mise à jour du lieu
 *       example:
 *         id: 98765432-1234-5678-1234-567812345678
 *         address: '456 Another St, Anytown, USA'
 *         phone_number: '+987654321'
 *         requiredPassLevel: 3
 *         requiredAgeLevel: 18
 *         createdAt: 2024-10-17T10:00:00Z
 *         updatedAt: 2024-10-17T10:00:00Z
 */
/**
 * @swagger
 * /places:
 *   post:
 *     summary: Créer une nouvelle place
 *     tags: [Places]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               required_pass_level:
 *                 type: integer
 *               required_age_level:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Place créée avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur interne
 */
/**
 * @swagger
 * /places:
 *   get:
 *     summary: Récupérer la liste de toutes les places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Liste des places récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       500:
 *         description: Erreur serveur interne
 */
/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Récupérer une place par ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la place
 *     responses:
 *       200:
 *         description: Place récupérée avec succès
 *       404:
 *         description: Place non trouvée
 *       500:
 *         description: Erreur serveur interne
 */
/**
 * @swagger
 * /places/{id}:
 *   put:
 *     summary: Mettre à jour une place
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la place à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               required_pass_level:
 *                 type: integer
 *               required_age_level:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Place mise à jour avec succès
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Place non trouvée
 *       500:
 *         description: Erreur serveur interne
 */
/**
 * @swagger
 * /places/{id}:
 *   delete:
 *     summary: Supprimer une place
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la place à supprimer
 *     responses:
 *       204:
 *         description: Place supprimée avec succès
 *       404:
 *         description: Place non trouvée
 *       500:
 *         description: Erreur serveur interne
 */
/**
 * @swagger
 * /places/{placeId}/access/{userId}:
 *   get:
 *     summary: Vérifier si un utilisateur a accès à une place
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: placeId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la place
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Statut d'accès renvoyé
 *       404:
 *         description: Place ou utilisateur non trouvé
 *       500:
 *         description: Erreur serveur interne
 */
/**
 * @swagger
 * /places/access/{userId}:
 *   get:
 *     summary: Récupérer la liste des places accessibles par un utilisateur
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des places accessibles récupérée avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur interne
 */
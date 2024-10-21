const request = require('supertest');
const { app, startServer } = require('../../app');
const jwt = require('jsonwebtoken');

let server;
const invalidToken = 'invalid_token_here'; // Faux token

beforeAll(async () => {
  server = await startServer(); // Démarrer le serveur avant les tests
});

afterAll(async () => {
  await server.close(); // Fermer le serveur après les tests
});

describe('User Routes - Token Absence', () => {
  
  it('should return 401 when trying to create a user without a token', async () => {
    const user = {
      first_name: 'John',
      last_name: 'Doe',
      age: 30,
      phone_number: '1234567890',
      address: '123 Main St',
    };

    const response = await request(app)
      .post('/api/users') // Créer un utilisateur sans token
      .send(user);

    expect(response.statusCode).toBe(401); // S'assurer que le statut est 401
    expect(response.body).toHaveProperty('message', 'Access denied, no token provided.'); // Optionnel: tester le message d'erreur
  });

  it('should return 401 when trying to retrieve all users without a token', async () => {
    const response = await request(app)
      .get('/api/users'); // Récupérer les utilisateurs sans token

    expect(response.statusCode).toBe(401); // S'assurer que le statut est 401
    expect(response.body).toHaveProperty('message', 'Access denied, no token provided.'); // Optionnel: tester le message d'erreur
  });
});

describe('User Routes - Invalid Token', () => {
    it('should return 403 when trying to retrieve all users with an invalid token', async () => {
      const response = await request(app)
        .get('/api/users') // Récupérer les utilisateurs
        .set('Authorization', `Bearer ${invalidToken}`); // Faux token
  
      expect(response.statusCode).toBe(403); // S'assurer que le statut est 403
      expect(response.body).toHaveProperty('message', 'Invalid or expired token'); // Optionnel: tester le message d'erreur
    });
  
  });

describe('User Routes - Valid Token', () => {

    it('should return 201 when trying to create a user a valid token', async () => {
        const secret = process.env.JWT_SECRET || 'your_secret_key_here';
  
        // Créer un token valide (simuler un utilisateur avec un id ou rôle par exemple)
        const validToken = jwt.sign({ id: 'user123', role: 'admin' }, secret, { expiresIn: '1h' });
        const user = {
          first_name: 'John',
          last_name: 'Doe',
          age: 30,
          phone_number: '1234567890',
          address: '123 Main St',
          passId: ['test1', 'test2']
        };
    
        const response = await request(app)
          .post('/api/users') 
          .set('Authorization', `Bearer ${validToken}`)
          .send(user);
    
        expect(response.statusCode).toBe(201); // S'assurer que le statut est 401
        expect(response.body).toHaveProperty('_id'); // Vérifier que l'ID est présent dans la réponse
        expect(response.body).toHaveProperty('first_name', user.first_name); // Vérifier le prénom
        expect(response.body).toHaveProperty('last_name', user.last_name); // Vérifier le nom
        expect(response.body).toHaveProperty('age', user.age); // Vérifier l'âge
        expect(response.body).toHaveProperty('phone_number', user.phone_number); // Vérifier le numéro de téléphone
        expect(response.body).toHaveProperty('address', user.address); // Vérifier l'adresse
        expect(response.body).toHaveProperty('passId'); // Vérifier que passId est présent
        expect(response.body.passId).toEqual(user.passId); // Vérifier que passId correspond
      });

  
    it('should return 200 when trying to retrieve all users with a valid token', async () => {
      // Clé secrète utilisée pour signer les tokens
      const secret = process.env.JWT_SECRET || 'your_secret_key_here';
  
      // Créer un token valide
      const validToken = jwt.sign({ id: 'user123', role: 'admin' }, secret, { expiresIn: '1h' });
  
      const response = await request(app)
        .get('/api/users') // Récupérer les utilisateurs
        .set('Authorization', `Bearer ${validToken}`); // Token valide
  
      expect(response.statusCode).toBe(200); // S'assurer que le statut est 200
      expect(Array.isArray(response.body)).toBe(true); // Vérifier que la réponse contient bien un tableau d'utilisateurs
    });
  
  });


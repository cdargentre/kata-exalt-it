const jwt = require('jsonwebtoken');

// Générer un Token JWT (login ou registration)
async function generateToken(req, res) {
  try {
    // Générer le token JWT sans lien avec un utilisateur
    const token = jwt.sign(
      {},
      process.env.JWT_SECRET, // Clé secrète de signature (dans .env)
      { expiresIn: '1h' }     // Durée de validité du token
    );

    // Répondre avec le token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error generating token', error });
  }
}
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extraction du token

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user; // Stocke les informations de l'utilisateur dans la requête
    next(); // Passe au middleware suivant
  });
}

module.exports = { generateToken, authenticateToken };

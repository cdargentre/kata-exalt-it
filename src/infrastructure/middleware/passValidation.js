const Joi = require('joi');

// Schéma de validation pour un pass
const passSchema = Joi.object({
    level: Joi.number().integer().min(1).max(5).required(), // Niveau du pass entre 1 et 5
});

// Middleware de validation
const validatePass = (db) => {
  return async (req, res, next) => {
    const { error } = passSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { level } = req.body;

    // Vérification de l'unicité du niveau
    const existingPass = await db.collection('passes').findOne({ level });
    if (existingPass) {
      return res.status(400).json({ message: 'Le niveau du pass doit être unique.' });
    }

    next(); // Appeler le prochain middleware si tout est valide
  };
};

module.exports = validatePass;

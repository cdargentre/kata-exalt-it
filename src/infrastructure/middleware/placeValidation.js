const Joi = require('joi');

// Schéma de validation pour une place
const placeSchema = Joi.object({
  address: Joi.string().min(1).max(255).required(), // Adresse de la place
  phone_number: Joi.string().required(), // Numéro de téléphone
  requiredPassLevel: Joi.number().integer().min(1).max(5).required(), // Niveau de pass requis entre 1 et 5
  requiredAgeLevel: Joi.number().integer().min(0).required(), // Niveau d'âge requis (par exemple, 0 et plus)
});

// Middleware de validation
const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    console.log('Joi Validation Error:', error);
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // Appeler le prochain middleware si tout est valide
};

module.exports = validatePlace;

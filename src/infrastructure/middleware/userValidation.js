const Joi = require('joi');

// Schéma de validation pour un utilisateur
const userSchema = Joi.object({
  first_name: Joi.string().min(1).max(30).required(),
  last_name: Joi.string().min(1).max(30).required(),
  age: Joi.number().integer().min(0).required(),
  phone_number: Joi.string().required(),
  address: Joi.string().required(),
  passId: Joi.array().items(Joi.string()).required(),
});

// Middleware de validation
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // Appeler le prochain middleware si tout est valide
};

module.exports = validateUser;

const { getDB } = require('../db/db');

const dbMiddleware = (req, res, next) => {
  req.db = getDB(); 
  next(); 
};

module.exports = dbMiddleware;
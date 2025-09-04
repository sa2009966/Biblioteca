const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Middleware de autenticación
 * Verifica el token JWT y asigna el usuario a la solicitud
 */
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: true,
      message: 'Por favor autentíquese'
    });
  }
};

/**
 * Middleware de autenticación de administrador
 * Verifica que el usuario autenticado tenga rol de administrador
 */
const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          error: true,
          message: 'Acceso denegado. Se requieren privilegios de administrador.'
        });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({
      error: true,
      message: 'Por favor autentíquese'
    });
  }
};

module.exports = {
  auth,
  adminAuth
}; 
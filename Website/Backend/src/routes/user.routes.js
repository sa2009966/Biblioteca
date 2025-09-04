const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { auth, adminAuth } = require('../middleware/auth.middleware');

/**
 * Obtener todos los usuarios
 * @route GET /api/users
 * @access Private (Admin)
 */
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      error: false,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al obtener los usuarios',
      details: error.message
    });
  }
});

/**
 * Obtener perfil de usuario
 * @route GET /api/users/profile
 * @access Private
 */
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      error: false,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al obtener el perfil de usuario',
      details: error.message
    });
  }
});

/**
 * Actualizar perfil de usuario
 * @route PUT /api/users/profile
 * @access Private
 */
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({
        error: true,
        message: 'Actualizaciones no válidas'
      });
    }

    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();

    res.json({
      error: false,
      message: 'Perfil actualizado exitosamente',
      data: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al actualizar el perfil',
      details: error.message
    });
  }
});

/**
 * Eliminar usuario
 * @route DELETE /api/users/:id
 * @access Private (Admin)
 */
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Usuario no encontrado'
      });
    }
    res.json({
      error: false,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al eliminar el usuario',
      details: error.message
    });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');
const { auth, adminAuth } = require('../middleware/auth.middleware');

/**
 * Obtener todos los libros
 * @route GET /api/books
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      error: false,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al obtener los libros',
      details: error.message
    });
  }
});

/**
 * Obtener un libro específico
 * @route GET /api/books/:id
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        error: true,
        message: 'Libro no encontrado'
      });
    }
    res.json({
      error: false,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al obtener el libro',
      details: error.message
    });
  }
});

/**
 * Crear un nuevo libro
 * @route POST /api/books
 * @access Private (Admin)
 */
router.post('/', adminAuth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({
      error: false,
      message: 'Libro creado exitosamente',
      data: book
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al crear el libro',
      details: error.message
    });
  }
});

/**
 * Actualizar un libro
 * @route PUT /api/books/:id
 * @access Private (Admin)
 */
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({
        error: true,
        message: 'Libro no encontrado'
      });
    }
    res.json({
      error: false,
      message: 'Libro actualizado exitosamente',
      data: book
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al actualizar el libro',
      details: error.message
    });
  }
});

/**
 * Eliminar un libro
 * @route DELETE /api/books/:id
 * @access Private (Admin)
 */
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        error: true,
        message: 'Libro no encontrado'
      });
    }
    res.json({
      error: false,
      message: 'Libro eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Error al eliminar el libro',
      details: error.message
    });
  }
});

module.exports = router; 
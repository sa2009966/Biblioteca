const mongoose = require('mongoose');

/**
 * Esquema de Libro
 * Define la estructura y validación para los documentos de libro en la base de datos
 */
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'El autor es requerido'],
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'El ISBN es requerido'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  category: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: {
      values: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Other'],
      message: 'Categoría no válida'
    }
  },
  quantity: {
    type: Number,
    required: [true, 'La cantidad es requerida'],
    min: [0, 'La cantidad no puede ser negativa']
  },
  available: {
    type: Number,
    required: [true, 'La cantidad disponible es requerida'],
    min: [0, 'La cantidad disponible no puede ser negativa']
  },
  publishedYear: {
    type: Number,
    required: [true, 'El año de publicación es requerido']
  },
  publisher: {
    type: String,
    required: [true, 'La editorial es requerida']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar la fecha de modificación antes de guardar
bookSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book; 
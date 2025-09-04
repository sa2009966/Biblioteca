// Esquemas para MongoDB

// Esquema de Libros
const libroSchema = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["titulo", "isbn", "autores", "editorial", "precio", "stock"],
            properties: {
                titulo: {
                    bsonType: "string",
                    description: "Título del libro - requerido"
                },
                isbn: {
                    bsonType: "string",
                    description: "ISBN del libro - requerido"
                },
                autores: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["nombre", "apellido"],
                        properties: {
                            nombre: { bsonType: "string" },
                            apellido: { bsonType: "string" },
                            id_autor_ref: { bsonType: "string" }
                        }
                    }
                },
                editorial: {
                    bsonType: "object",
                    required: ["nombre"],
                    properties: {
                        nombre: { bsonType: "string" },
                        id_editorial_ref: { bsonType: "string" }
                    }
                },
                categorias: {
                    bsonType: "array",
                    items: { bsonType: "string" }
                },
                descripcion: { bsonType: "string" },
                numero_paginas: { bsonType: "int" },
                precio: {
                    bsonType: "double",
                    minimum: 0
                },
                precios_historicos: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        properties: {
                            fecha: { bsonType: "date" },
                            precio: { bsonType: "double" }
                        }
                    }
                },
                stock: {
                    bsonType: "int",
                    minimum: 0
                },
                formato: { bsonType: "string" },
                idioma: { bsonType: "string" },
                imagen_portada: { bsonType: "string" },
                reseñas_promedio: {
                    bsonType: "double",
                    minimum: 0,
                    maximum: 5
                },
                activo: { bsonType: "bool" },
                fecha_publicacion: { bsonType: "date" },
                fecha_creacion: { bsonType: "date" },
                fecha_actualizacion: { bsonType: "date" }
            }
        }
    }
};

// Esquema de Categorías
const categoriaSchema = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre"],
            properties: {
                nombre: { bsonType: "string" },
                descripcion: { bsonType: "string" },
                padre_id: { bsonType: "string" },
                nivel: { bsonType: "int" },
                activa: { bsonType: "bool" },
                fecha_creacion: { bsonType: "date" },
                fecha_actualizacion: { bsonType: "date" }
            }
        }
    }
};

// Esquema de Reseñas
const reseñaSchema = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["libro_id", "usuario_id", "calificacion", "comentario"],
            properties: {
                libro_id: { bsonType: "string" },
                usuario_id: { bsonType: "string" },
                calificacion: {
                    bsonType: "int",
                    minimum: 1,
                    maximum: 5
                },
                comentario: { bsonType: "string" },
                fecha: { bsonType: "date" },
                aprobada: { bsonType: "bool" },
                likes: { bsonType: "int" }
            }
        }
    }
};

// Índices recomendados
const indices = {
    libros: [
        { key: { isbn: 1 }, unique: true },
        { key: { "autores.nombre": 1, "autores.apellido": 1 } },
        { key: { categorias: 1 } },
        { key: { precio: 1 } },
        { key: { stock: 1 } },
        { key: { reseñas_promedio: -1 } }
    ],
    categorias: [
        { key: { nombre: 1 }, unique: true },
        { key: { padre_id: 1 } }
    ],
    reseñas: [
        { key: { libro_id: 1, usuario_id: 1 }, unique: true },
        { key: { libro_id: 1, fecha: -1 } }
    ]
};

// Ejemplo de documento de libro
const ejemploLibro = {
    titulo: "Cien años de soledad",
    isbn: "978-0307474278",
    autores: [
        {
            nombre: "Gabriel",
            apellido: "García Márquez",
            id_autor_ref: "autor_sqldb_id_123"
        }
    ],
    editorial: {
        nombre: "Penguin Random House",
        id_editorial_ref: "editorial_sqldb_id_456"
    },
    categorias: ["Ficción", "Realismo Mágico"],
    descripcion: "Una obra maestra de la literatura latinoamericana...",
    numero_paginas: 496,
    precio: 15.99,
    precios_historicos: [
        {
            fecha: new Date("2024-01-01"),
            precio: 16.99
        },
        {
            fecha: new Date("2024-03-01"),
            precio: 15.99
        }
    ],
    stock: 150,
    formato: "Tapa blanda",
    idioma: "Español",
    imagen_portada: "https://ejemplo.com/portada_cien_anos.jpg",
    reseñas_promedio: 4.8,
    activo: true,
    fecha_publicacion: new Date("1967-05-30"),
    fecha_creacion: new Date(),
    fecha_actualizacion: new Date()
};

// Exportar esquemas y configuraciones
module.exports = {
    libroSchema,
    categoriaSchema,
    reseñaSchema,
    indices,
    ejemploLibro
}; 
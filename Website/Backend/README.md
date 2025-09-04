# Sistema de Gestión de Biblioteca - Backend

Este es el backend API para un Sistema de Gestión de Biblioteca. Proporciona endpoints para gestionar libros, usuarios y autenticación.

## Características

- Autenticación de usuarios con JWT
- Gestión de libros (operaciones CRUD)
- Gestión de usuarios
- Manejo seguro de contraseñas
- Integración con base de datos MongoDB

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```
3. Crear un archivo `.env` en el directorio raíz con las siguientes variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=tu_clave_secreta_jwt
```

## Ejecutar la Aplicación

Modo desarrollo:
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

## Endpoints de la API

### Autenticación
- POST /api/auth/register - Registrar un nuevo usuario
- POST /api/auth/login - Iniciar sesión de usuario

### Libros
- GET /api/books - Obtener todos los libros
- GET /api/books/:id - Obtener un libro específico
- POST /api/books - Crear un nuevo libro
- PUT /api/books/:id - Actualizar un libro
- DELETE /api/books/:id - Eliminar un libro

### Usuarios
- GET /api/users - Obtener todos los usuarios (solo administradores)
- GET /api/users/:id - Obtener perfil de usuario
- PUT /api/users/:id - Actualizar perfil de usuario
- DELETE /api/users/:id - Eliminar usuario (solo administradores)

## Integración con Frontend

Para integrar este backend con una aplicación frontend:

1. Configurar CORS en tu aplicación frontend para permitir solicitudes al backend API
2. Almacenar el token JWT en localStorage o una cookie segura después del inicio de sesión
3. Incluir el token JWT en el encabezado de Autorización para rutas protegidas:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## Seguridad

- Todas las contraseñas están hasheadas usando bcrypt
- Se utilizan tokens JWT para la autenticación
- Las rutas protegidas requieren tokens JWT válidos
- Se implementa validación de entrada para todos los endpoints

## Manejo de Errores

La API utiliza un formato consistente de respuesta de error:
```json
{
  "error": true,
  "message": "Mensaje de error",
  "details": "Detalles adicionales del error (si existen)"
}
```

## Ejemplo de Uso con Frontend

```javascript
// Ejemplo de inicio de sesión
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    throw error;
  }
};

// Ejemplo de llamada API protegida
const obtenerLibros = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/books', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error al obtener libros:', error);
    throw error;
  }
};
```

## Estructura del Proyecto

```
src/
├── models/          # Modelos de la base de datos
├── routes/          # Rutas de la API
├── middleware/      # Middleware de autenticación
└── index.js         # Archivo principal de la aplicación
```

## Contribución

1. Fork el proyecto
2. Crear una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request 
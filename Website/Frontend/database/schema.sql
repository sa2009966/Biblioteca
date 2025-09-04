-- Crear la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS litesia_db;
USE litesia_db;

-- Crear tabla de Roles
CREATE TABLE Roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de Permisos
CREATE TABLE Permisos (
    id_permiso INT AUTO_INCREMENT PRIMARY KEY,
    nombre_permiso VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de relación Roles_Permisos
CREATE TABLE Roles_Permisos (
    id_rol INT,
    id_permiso INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_rol, id_permiso),
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol) ON DELETE CASCADE,
    FOREIGN KEY (id_permiso) REFERENCES Permisos(id_permiso) ON DELETE CASCADE
);

-- Crear tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255),
    id_rol INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    ultimo_login TIMESTAMP NULL,
    token_reset_contrasena VARCHAR(255) NULL,
    expiracion_token_reset TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);

-- Insertar roles básicos
INSERT INTO Roles (nombre_rol, descripcion) VALUES
('Administrador', 'Acceso total al sistema'),
('Cliente', 'Usuario regular con acceso a compras'),
('Editor', 'Puede gestionar contenido pero no usuarios');

-- Insertar permisos básicos
INSERT INTO Permisos (nombre_permiso, descripcion) VALUES
('crear_libro', 'Permite crear nuevos libros'),
('editar_libro', 'Permite modificar libros existentes'),
('eliminar_libro', 'Permite eliminar libros'),
('ver_pedidos', 'Permite ver pedidos'),
('gestionar_usuarios', 'Permite gestionar usuarios del sistema'),
('realizar_compra', 'Permite realizar compras');

-- Asignar permisos a roles
INSERT INTO Roles_Permisos (id_rol, id_permiso) VALUES
-- Administrador (tiene todos los permisos)
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
-- Cliente (solo puede ver y comprar)
(2, 4), (2, 6),
-- Editor (puede gestionar contenido)
(3, 1), (3, 2), (3, 4);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_usuarios_email ON Usuarios(email);
CREATE INDEX idx_usuarios_activo ON Usuarios(activo);
CREATE INDEX idx_roles_nombre ON Roles(nombre_rol);
CREATE INDEX idx_permisos_nombre ON Permisos(nombre_permiso);

-- Crear trigger para actualizar ultimo_login
DELIMITER //
CREATE TRIGGER actualizar_ultimo_login
AFTER UPDATE ON Usuarios
FOR EACH ROW
BEGIN
    IF NEW.ultimo_login IS NOT NULL AND NEW.ultimo_login != OLD.ultimo_login THEN
        SET NEW.ultimo_login = CURRENT_TIMESTAMP;
    END IF;
END//
DELIMITER ; 
USE tpo_apis;
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nombreUsuario VARCHAR(255) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    dni INT NOT NULL UNIQUE,
    telefono INT,
    email VARCHAR(255) NOT NULL UNIQUE,
    rolUsuario ENUM('empleado', 'duenio', 'inquilino') NOT NULL
);

CREATE TABLE Direccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ciudad VARCHAR(255),
    localidad VARCHAR(255),
    calle VARCHAR(255),
    altura INT
);

CREATE TABLE Edificio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ciudad VARCHAR(255),
    localidad VARCHAR(255),
    calle VARCHAR(255),
    altura INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE AreaComun (
    idAreaComun INT AUTO_INCREMENT PRIMARY KEY,
    piso INT,
    nombre VARCHAR(255) NOT NULL,
    edificio_id INT,
    FOREIGN KEY (edificio_id) REFERENCES Edificio(id)
);

CREATE TABLE Unidad (
    idUnidad INT AUTO_INCREMENT PRIMARY KEY,
    piso INT,
    nroUnidad INT,
    estado VARCHAR(50) NOT NULL,
    duenio_id INT, -- Clave foránea para Usuario (duenio)
    inquilino_id INT, -- Clave foránea para Usuario (inquilino)
    edificio_id INT, -- Clave foránea para Edificio
    FOREIGN KEY (duenio_id) REFERENCES Usuario(id),
    FOREIGN KEY (inquilino_id) REFERENCES Usuario(id),
    FOREIGN KEY (edificio_id) REFERENCES Edificio(id)
);



CREATE TABLE Reclamo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255),
    estado ENUM('NUEVO', 'ABIERTO', 'EN_PROCESO', 'DESESTIMADO', 'ANULADO', 'TERMINADO') NOT NULL,
    fechaCreacion TIMESTAMP,
    fechaModificacion TIMESTAMP,
    usuario INT, -- Clave foránea para Usuario
    unidad INT, -- Clave foránea para Unidad
    areaComun INT, -- Clave foránea para AreaComun
    edificio INT, -- Clave foránea para Edificio
    FOREIGN KEY (usuario) REFERENCES Usuario(id),
    FOREIGN KEY (unidad) REFERENCES Unidad(idUnidad),
    FOREIGN KEY (areaComun) REFERENCES AreaComun(idAreaComun),
    FOREIGN KEY (edificio) REFERENCES Edificio(id)
);


CREATE TABLE Imagen (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    datosImagen LONGBLOB,
    reclamo_id INT,
    FOREIGN KEY (reclamo_id) REFERENCES Reclamo(id)
);

-- Ver tablas
-- SELECT * from Usuario;
-- SELECT * from Area_Comun;
-- SELECT * from Reclamo;
-- SELECT * from Unidad;
SELECT * from Edificio;
-- Eliminar usuarios
DELETE FROM Edificio; 


-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS Imagen;
-- DROP TABLE IF EXISTS Reclamo;
-- DROP TABLE IF EXISTS Unidad;
-- DROP TABLE IF EXISTS AreaComun;
-- DROP TABLE IF EXISTS Edificio;
-- DROP TABLE IF EXISTS Usuario;
-- DROP TABLE IF EXISTS Direccion;
-- SET FOREIGN_KEY_CHECKS = 1;
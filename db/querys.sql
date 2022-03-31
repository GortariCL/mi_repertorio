CREATE DATABASE repertorio;

CREATE TABLE repertorio(
    id SERIAL PRIMARY KEY,
    cancion VARCHAR(50) NOT NULL,
    artista VARCHAR(50) NOT NULL,
    tono VARCHAR(10) NOT NULL
);
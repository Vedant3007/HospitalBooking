-- database/init.sql

DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT CHECK(role IN ('patient', 'doctor'))
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    doctor TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    notes TEXT,
    symptoms TEXT
);

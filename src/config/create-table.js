const { pool } = require("./db");

const usersTable = `CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL,
    "name" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(100) NOT NULL,
	created_on TIMESTAMP NOT NULL,
    PRIMARY KEY ("id")

);`;

const usersPhotoTable = `
CREATE TABLE IF NOT EXISTS users_photo(
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    img text NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_customer
       FOREIGN KEY(user_id) 
       REFERENCES users(id)
 );
`;

const languagesTable = `CREATE TABLE IF NOT EXISTS "languages" (
    "id" SERIAL,
    "name" VARCHAR(50) NOT NULL,
    "code" VARCHAR(50) NOT NULL UNIQUE,
	created_on TIMESTAMP NOT NULL,
    PRIMARY KEY ("id")

);`;

const lessonsTable = `
CREATE TABLE IF NOT EXISTS lessons(
    id INT GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(100) NOT NULL,
    "lesson_text" VARCHAR(250) NOT NULL,
    lang_id INT,
    status BOOLEAN DEFAULT true,
	created_on TIMESTAMP DEFAULT NOW()  NOT NULL ,
    PRIMARY KEY(id),
    CONSTRAINT fk_customer
       FOREIGN KEY(lang_id) 
       REFERENCES languages(id)
 );
`;

const courseTable = `CREATE TABLE IF NOT EXISTS courses(
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    user_id INT,
    img text NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_customer
       FOREIGN KEY(user_id) 
       REFERENCES users(id)
 );`;

const createTable = async () => {
  await pool.query(usersTable);
  await pool.query(usersPhotoTable);
  await pool.query(languagesTable);
  await pool.query(lessonsTable);
  await pool.query(courseTable);
};

createTable();

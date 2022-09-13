const { pool } = require("./db");

const accountTable = `CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL,
    "name" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(100) NOT NULL,
    "profile_picture" VARCHAR(250),
	created_on TIMESTAMP NOT NULL,
    PRIMARY KEY ("id")

);`

pool.query(accountTable)
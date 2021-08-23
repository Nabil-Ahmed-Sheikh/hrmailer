import { Sequelize } from "sequelize";

const database = process.env.DATABASE_NAME || "hrmailer";
const username = process.env.DATABASE_USER_NAME || "root";
const password = process.env.DATABASE_PASSWORD || "";
const host = process.env.DATABASE_HOST || "localhost";
const dialect = process.env.DATABASE_DIALECT || "mysql";

const db = new Sequelize(database, username, password, {
  host,
  dialect,
});

export default db;

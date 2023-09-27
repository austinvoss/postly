const pgp = require("pg-promise")();

const db = pgp({
  host: "localhost",
  port: 5432,
  database: "voss",
  user: "voss",
  password: "your_password",
});

module.exports = db;

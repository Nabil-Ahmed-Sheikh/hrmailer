import mysql from "mysql";

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hrmailer",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
});

connection.query("DROP TABLE IF EXISTS users", function (err, rows, fields) {
  if (err) throw err;
  console.log("users table dropped");
});

connection.query(
  "CREATE TABLE users (firstName varchar(255), lastName varchar(255), email varchar(255), PRIMARY KEY (email))",
  function (err, rows, fields) {
    if (err) throw err;
    console.log("users table created");
  }
);

connection.query(
  `INSERT INTO users( firstName, lastName, email ) 
  VALUES ('Zehad', 'Hassan', 'zehad@example.com'), 
  ('Jane', 'Doe', 'jane@example.com'), 
  ('Billy', 'Wales', 'billy@example.com'),
  ('Miranda', 'Moose', 'moose@example.com'), 
  ('John', 'Doe', 'john@example.com'), 
  ('Zahid', 'Hassan', 'zahid@example.com'), 
  ('Jalal', 'Uddin', 'jalal@example.com'), 
  ('Jahangir', 'Pasha', 'pasha@example.com')`,
  function (err, rows, fields) {
    if (err) throw err;
    console.log("Inserted dummy rows");
  }
);

connection.end();

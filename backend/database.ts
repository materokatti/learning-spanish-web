import mysql from "mysql";

const pool: mysql.Pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Ghkdehdbs1!",
  database: "spanish_learning",
});

export default pool;

import mysql from "mysql";

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "srvan",
});

export default db;

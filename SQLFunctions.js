const mysql = require("mysql2");
const config = require("./config");
const pool = mysql.createPool(config);

const encontrarUsuario = (username) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM cadastro WHERE Login = '${username}'`;
  
      pool.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results[0] : null);
        }
      });
    });
  };

module.exports = {encontrarUsuario};
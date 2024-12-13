const mysql = require('mysql2');
const config = { // Configuração para conexão com SQL
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'solar2',
};

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
    if (err) {
        console.log({ error: err.message })
    }

    console.log("Conectado no MYSQL Database")
    connection.release();
})

module.exports = pool;
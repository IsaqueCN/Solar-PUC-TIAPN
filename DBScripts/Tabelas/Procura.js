const util = require('util');
const pool = require('../db');
const query = util.promisify(pool.query).bind(pool);

const Get = (IDCliente, CNPJ = null) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM procura WHERE fk_Cliente_IDCliente = '${IDCliente}'`
        if (CNPJ)
            query += ` AND fk_EmpresasParceiras_CNPJ = '${CNPJ}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {Get}
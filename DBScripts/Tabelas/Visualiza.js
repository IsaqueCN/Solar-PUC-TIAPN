const util = require('util');
const pool = require('../db');
const { create } = require('domain');
const query = util.promisify(pool.query).bind(pool);

const Get = (IDCliente, IDConteudo = null) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM visualiza WHERE fk_Cliente_IDCliente = '${IDCliente}'`
        if (IDConteudo)
            query += ` AND fk_Conteudo_IDConteudo = '${IDConteudo}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const GetAll = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM visualiza`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const Create = async (IDCliente, IDConteudo) => {
    try {
        const inserir = `INSERT INTO visualiza (fk_Cliente_IDCliente, fk_Conteudo_IDConteudo) VALUES (${IDCliente}, ${IDConteudo})`;
        await query(inserir)
    } catch (ex) {
        return ex;
    }
}

module.exports = {GetAll, Get, Create}
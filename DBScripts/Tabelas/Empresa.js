const util = require('util');
const pool = require('../db');
const { GetByCategory } = require('./Conteudo');
const { GetByName } = require('./PalavraChave');
const query = util.promisify(pool.query).bind(pool);
const EmpresaCNPJ = "12345678000195"

const Get = (nome) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM empresa WHERE Nome = '${nome}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length ? results[0] : null);
            }
        });
    });
};

const GetAll = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM empresa`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const GetByCNPJ= (CNPJ) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM empresa WHERE CNPJ = '${CNPJ}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length ? results[0] : null);
            }
        });
    });
};

const Create = async (nome, CNPJ) => {
    if (await Get(nome))
        return;

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO empresa (CNPJ_Empresa, Nome) VALUES('${CNPJ}', '${nome}')`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {EmpresaCNPJ, Get, GetAll, GetByCNPJ, GetByCategory, GetByName, Create};
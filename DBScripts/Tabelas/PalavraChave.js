const util = require('util');
const pool = require('../db');
const query = util.promisify(pool.query).bind(pool);

const NovoID = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT Max(PalavraChave_PK) FROM palavrachave`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]['Max(PalavraChave_PK)']+1);
            }
        });
    });
};

const Get = (IDPalavraChave) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM palavrachave WHERE PalavraChave_PK = '${IDPalavraChave}'`;

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
        const query = `SELECT * FROM palavrachave`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const GetByName = (nome) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM palavrachave WHERE PalavraChave = '${nome}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length ? results[0] : null);
            }
        });
    });
};


const Create = async (nome) => {
    let novoID = (await NovoID());

    try {
        if (await GetByName(nome))
            throw "PalavraChave já existe";
        
        const inserir = `INSERT INTO palavrachave (PalavraChave_PK, PalavraChave) VALUES (${novoID}, '${nome}')`;
        
        await query(inserir)
    } catch (ex) {
        return ex;
    }
}

module.exports = {Get, GetAll, GetByName, Create};

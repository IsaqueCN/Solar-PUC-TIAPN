const pool = require("../db");

const Get = (login) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM cadastro WHERE Login = '${login}'`;

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
        const query = `SELECT * FROM cadastro`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const NovoID = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT Max(IDCadastro) FROM Cadastro`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]['Max(IDCadastro)']+1);
            }
        });
    });
};

module.exports = {NovoID, Get, GetAll};
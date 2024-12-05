const pool = require('../db')

const NovoID = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT Max(Protocolo) FROM atendimento_atende`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]['Max(Protocolo)']+1);
            }
        });
    });
};

const Get = (Protocolo) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM atendimento_atende WHERE Protocolo = '${Protocolo}'`;

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
        const query = `SELECT * FROM atendimento_atende`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {Get, GetAll};
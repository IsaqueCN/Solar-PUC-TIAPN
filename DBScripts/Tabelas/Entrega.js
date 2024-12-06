const util = require('util');
const pool = require('../db');
const query = util.promisify(pool.query).bind(pool);

const Get = (IDCliente, IDFeedback) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM entrega WHERE fk_Cliente_IDCliente = '${IDCliente}' AND fk_Feedback_IDFeedback = '${IDFeedback}'`;

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
        const query = `SELECT * FROM entrega`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const GetByClientID = (IDCliente) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM entrega WHERE fk_Cliente_IDCliente = '${IDCliente}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


const Create = async (IDCliente, IDFeedback) => {
    try {
        const inserir = `INSERT INTO entrega (fk_Cliente_IDCliente, fk_Feedback_IDFeedback) VALUES (${IDCliente}, ${IDFeedback})`;
        
        await query(inserir)
    } catch (ex) {
        return ex;
    }
}

module.exports = {Get, GetAll, GetByClientID, Create};

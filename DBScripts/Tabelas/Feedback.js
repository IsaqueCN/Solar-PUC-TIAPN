const util = require('util');
const pool = require('../db');
const query = util.promisify(pool.query).bind(pool);
const Entrega = require('./Entrega');

const NovoID = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT Max(IDFeedback) FROM Feedback`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]['Max(IDFeedback)']+1);
            }
        });
    });
};

const GetAll = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Feedback`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const Get = (IDFeedback) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM feedback WHERE IDFeedback = ${IDFeedback}`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length ? results[0] : null);
            }
        });
    });
};


const Create = async (idcliente, funcionalidade, nota, descricao) => {
    let novoID = (await NovoID());

    try {
        const inserirFeedback = `INSERT INTO Feedback (Funcionalidade, Nota, Descricao, IDFeedback) VALUES('${funcionalidade}', ${nota}, '${descricao}', ${novoID});`;

        await query(inserirFeedback)
        await Entrega.Create(idcliente, novoID);
    } catch (ex) {
        return ex;
    }
}

module.exports = { Get, GetAll, NovoID, Create };
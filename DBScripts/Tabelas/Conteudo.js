const util = require('util');
const pool = require('../db');
const query = util.promisify(pool.query).bind(pool);

const PalavraChave = require("./PalavraChave");

const NovoID = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT Max(IDConteudo) FROM conteudo`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]['Max(IDConteudo)']+1);
            }
        });
    });
};

const Get = (IDConteudo) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM conteudo WHERE IDConteudo = '${IDConteudo}'`;

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
        const query = `SELECT * FROM conteudo`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const GetByName = (Nome) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM conteudo WHERE Nome = '${Nome}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const GetByCategory = (Categoria) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM conteudo WHERE Categoria = '${Categoria}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const GetPalavrasChaves = async (IDConteudo) => {
    let conteudo = await Get(IDConteudo);

    return PalavraChave.Get(conteudo.fk_PalavraChave_PalavraChave_PK)
}

const Create = async (nome, categoria, palavraChave, descricao, resumo, texto) => {
    let novoID = (await NovoID());

    try {
        if ((await GetByName(nome))[0])
            throw "Nome de conteúdo já existente";

        if (! (await PalavraChave.GetByName(palavraChave))) {
            await PalavraChave.Create(palavraChave);
        }
        palavraChave = (await PalavraChave.GetByName(palavraChave)).PalavraChave_PK;
        const inserir = `INSERT INTO conteudo (IDConteudo, Nome, Categoria, fk_PalavraChave_PalavraChave_PK, Descricao, Resumo, Texto) VALUES (${novoID}, '${nome}', '${categoria}', ${palavraChave}, '${descricao}', '${resumo}', '${texto}')`;
        
        await query(inserir)
    } catch (ex) {
        return ex;
    }
}
module.exports = {Get, GetAll, GetByName, GetByCategory, GetPalavrasChaves, Create};


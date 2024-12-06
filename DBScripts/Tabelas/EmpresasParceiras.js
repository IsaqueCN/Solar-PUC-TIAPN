const util = require('util');
const pool = require('../db');
const query = util.promisify(pool.query).bind(pool);

const Empresa = require('./Empresa');
const Cadastro = require('./Cadastro');


const Get = (CNPJ) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM empresasparceiras WHERE CNPJ = '${CNPJ}'`;

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
        const query = `SELECT * FROM empresasparceiras`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const Create = async (cnpj, nome, endereco, telefone, senha) => {
    let novoCadastroID = (await Cadastro.NovoID());

    try {
        if (await Get(cnpj))
            throw "Empresta já existente";

        await Empresa.Create("Solar", Empresa.EmpresaCNPJ);
        const inserirCadastro = `INSERT INTO cadastro (TipoUsuario, Senha, Login, IDCadastro, Data, Status) VALUES ('EmpresaParceira', '${senha}', '${nome}', ${novoCadastroID}, curdate(), 'pendente')`;
        const inserirEmpresaParceira = `INSERT INTO empresasparceiras (CNPJ, Nome, Endereco, Telefone, fk_Empresa_CNPJ_Empresa, fk_Cadastro_IDCadastro) VALUES(${cnpj}, '${nome}','${endereco}', '${telefone}', '${Empresa.EmpresaCNPJ}', '${novoCadastroID}');`;
        
        await query(inserirCadastro)
        await query(inserirEmpresaParceira)

    } catch (ex) {
        return ex;
    }
}

module.exports = {Get, GetAll, Create};
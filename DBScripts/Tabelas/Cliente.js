const util = require('util');
const pool = require('../db');
const query = util.promisify(pool.query).bind(pool);

const Empresa = require("./Empresa");
const Cadastro = require("./Cadastro");

const Get = (IDCadastro) => { return ObterPerfil("cliente", IDCadastro) };

const GetAll = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM cliente`;

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
        const query = `SELECT Max(IDCliente) FROM cliente`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]['Max(IDCliente)']+1);
            }
        });
    });
};

const ObterPerfil = (tipoUsuario, IDCadastro) => {
    tipoUsuario = tipoUsuario.toLowerCase();
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tipoUsuario} WHERE fk_Cadastro_IDCadastro = '${IDCadastro}'`;

        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length ? results[0] : null);
            }
        });
    });
};


const Create = async (nome, senha, email) => {
    let novoID = (await Cadastro.NovoID());
    let novoIDCliente = (await NovoID());

    try {
        await Empresa.Create("Solar", Empresa.EmpresaCNPJ);
        const inserirCadastro = `INSERT INTO cadastro (TipoUsuario, Senha, Login, IDCadastro, Data, Status) VALUES ('Cliente', '${senha}', '${nome}', ${novoID}, curdate(), 'aprovado')`;
        const inserirCliente = `INSERT INTO cliente (IDCliente, Email, Nome, fk_Empresa_CNPJ_Empresa, fk_Cadastro_IDCadastro) VALUES(${novoIDCliente}, '${email}','${nome}', '${Empresa.EmpresaCNPJ}', '${novoID}');`;

        await query(inserirCadastro)
        await query(inserirCliente)
    } catch (ex) {
        return ex;
    }
}

const Update = async (nome, email, telefone, endereco, senha, idcliente, idcadastro) => {
    try {
        nome = (nome == null) ? null : `'${nome}'`
        email = (email == null) ? null : `'${email}'`
        telefone = (telefone == null) ? null : `'${telefone}'`
        endereco = (endereco == null) ? null : `'${endereco}'`
        senha = (senha == null) ? null : `'${senha}'`

        const updateCadastro = `UPDATE cadastro SET Senha = ${senha}, Login = ${nome} WHERE IDCadastro = ${idcadastro}`
        const updateCliente = `UPDATE cliente SET Email = ${email}, Telefone = ${telefone}, Endereco = ${endereco}, Nome = ${nome} WHERE IDCliente = ${idcliente}`;

        await query(updateCadastro)
        await query(updateCliente)
    } catch (ex) {
        return ex;
    }
};

module.exports = { Get, GetAll, NovoID, ObterPerfil, Create, Update };
const mysql = require("mysql2");
const config = require("./config");
const pool = mysql.createPool(config);
const EmpresaCNPJ = "12345678000195"

const GetCadastro = (login) => {
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

const GetEmpresa = (nome) => {
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

const CriarEmpresa = async (nome, CNPJ) => {
  let jaExiste = await GetEmpresa(nome);

  if (jaExiste)
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

const GetCliente = (IDCadastro) => {return ObterPerfil("cliente", IDCadastro)};

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

const NovoIDCliente = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT Max(IDCliente) FROM cliente`;

    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]['Max(IDCliente)']);
      }
    });
  });
};

const NovoIDCadastro = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT Max(IDCadastro) FROM Cadastro`;

    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]['Max(IDCadastro)']);
      }
    });
  });
};
const CriarCliente = async (nome, senha, email) => {
  let novoID = (await NovoIDCadastro());
  let novoIDCliente = (await NovoIDCliente());

  try {
    await CriarEmpresa("Solar", EmpresaCNPJ);
    const inserirCadastro = `INSERT INTO cadastro (TipoUsuario, Senha, Login, IDCadastro, Data) VALUES ('Cliente', '${senha}', '${nome}', ${novoID + 1}, curdate())`;
    const inserirCliente = `INSERT INTO cliente (IDCliente, Email, Nome, fk_Empresa_CNPJ_Empresa, fk_Cadastro_IDCadastro) VALUES(${novoIDCliente + 1}, '${email}','${nome}', '${EmpresaCNPJ}', '${novoID + 1}');`;

    pool.query(inserirCadastro, (err) => {
      if (err) {
        throw err;
      }
    });

    pool.query(inserirCliente, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (ex) {
    return ex;
  }
}
const AtualizarCliente = async (nome, email, telefone, endereco, senha, idcliente, idcadastro) => {
  try {
    nome = (nome == null) ? null : `'${nome}'`
    email = (email == null) ? null : `'${email}'`
    telefone = (telefone == null) ? null : `'${telefone}'`
    endereco = (endereco == null) ? null : `'${endereco}'`
    senha = (senha == null) ? null : `'${senha}'`

    const updateCadastro = `UPDATE cadastro SET Senha = ${senha}, Login = ${nome} WHERE IDCadastro = ${idcadastro}`
    const updateCliente = `UPDATE cliente SET Email = ${email}, Telefone = ${telefone}, Endereco = ${endereco}, Nome = ${nome} WHERE IDCliente = ${idcliente}`;

    pool.query(updateCadastro, (err) => {
      if (err) {
        throw err;
      }
    });

    pool.query(updateCliente, (err, results) => {
      if (err) {
        throw err;
      }
    });
  } catch (ex) {
    return ex;
  }
};

module.exports = { GetCadastro, GetCliente, GetEmpresa, ObterPerfil, CriarCliente, AtualizarCliente };
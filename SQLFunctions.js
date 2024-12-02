const mysql = require("mysql2");
const config = require("./config");
const pool = mysql.createPool(config);

const encontrarUsuario = (username) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM cadastro WHERE Login = '${username}'`;

    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const encontrarEmpresa = (nome) => {
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

const criarEmpresa = async (nome, CNPJ) => {
  let jaExiste = await encontrarEmpresa(nome);

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

const ObterPerfil = (tipoUsuario, IDCadastro) => {
  let tipo = "";
  switch (tipoUsuario) {
    case 'Cliente': tipo = 'cliente'; coluna = ''; break;
    case 'Funcionario': tipo = 'funcionario'; break;
    case 'EmpresaParceira': tipo = 'empresasparceiras'; break;
  }
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tipo} WHERE fk_Cadastro_IDCadastro = '${IDCadastro}'`;

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
        resolve(results[0]);
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
        resolve(results[0]);
      }
    });
  });
};
const CriarCliente = async (nome, senha, email) => {
  let novoID = (await NovoIDCadastro())['Max(IDCadastro)']
  let novoIDCliente = (await NovoIDCliente())['Max(IDCliente)'];
  let EmpresaCNPJ = "12345678000195"
  
  try {
    await criarEmpresa("Solar", EmpresaCNPJ);

    await new Promise((resolve, reject) => {
      const query = `INSERT INTO cadastro (TipoUsuario, Senha, Login, IDCadastro, Data) VALUES ('Cliente', '${senha}', '${nome}', ${novoID+1}, curdate())`;
  
      pool.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    await new Promise((resolve, reject) => {
      const query = `INSERT INTO cliente (IDCliente, Email, Nome, fk_Empresa_CNPJ_Empresa, fk_Cadastro_IDCadastro) VALUES(${novoIDCliente+1}, '${email}','${nome}', '${EmpresaCNPJ}', '${novoID+1}');`;
  
      pool.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (ex) {
    return ex;
  }
}
const AtualizarCliente = async (nome, email, telefone, endereco, senha, idcliente, idcadastro) => {
  try {
  await new Promise((resolve, reject) => {
    const query = `UPDATE cadastro SET Senha = '${senha}', Login = '${nome}' WHERE IDCadastro = ${idcadastro}`

    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  await new Promise((resolve, reject) => {
    let tel = (telefone == null) ? null : `'${telefone}'`
    let end = (endereco == null) ? null : `'${endereco}'`
    const query = `UPDATE cliente SET Email = '${email}', Telefone = ${tel}, Endereco = ${end}, Nome = '${nome}' WHERE IDCliente = ${idcliente}`;

    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  } catch (ex) {
    return ex;
  }
};

module.exports = { encontrarUsuario, ObterPerfil, CriarCliente, AtualizarCliente };
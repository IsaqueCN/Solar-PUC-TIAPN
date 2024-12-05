const mysql = require("mysql2");

// Tabelas
const Empresa = require("./Tabelas/Empresa");
const Cadastro = require("./Tabelas/Cadastro");
const Cliente = require('./Tabelas/Cliente'); 
const EmpresasParceiras = require('./Tabelas/EmpresasParceiras');
const Procura = require('./Tabelas/Procura')
const Atendimento_atende = require('./Tabelas/Atendimento_atende');
const Conteudo = require('./Tabelas/Conteudo');
const PalavraChave = require('./Tabelas/PalavraChave');

module.exports = { Cliente, Cadastro, Empresa, EmpresasParceiras, Procura, Atendimento_atende, Conteudo, PalavraChave };
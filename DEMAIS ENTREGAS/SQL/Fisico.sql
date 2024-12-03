CREATE TABLE Cliente (
    IDCliente INTEGER PRIMARY KEY,
    Email VARCHAR(35),
    Telefone VARCHAR(20),
    Endereco VARCHAR(60),
    Nome VARCHAR(40),
    fk_Empresa_CNPJ_Empresa VARCHAR(14),
    fk_Cadastro_IDCadastro INTEGER
);

CREATE TABLE Administrador (
    fk_Funcionario_CPF VARCHAR(12) PRIMARY KEY,
    fk_Empresa_CNPJ_Empresa VARCHAR(14)
);

CREATE TABLE Suporte_ao_Cliente (
    fk_Funcionario_CPF VARCHAR(12) PRIMARY KEY
);

CREATE TABLE Gerente_de_Conteudo (
    fk_Funcionario_CPF VARCHAR(12) PRIMARY KEY
);

CREATE TABLE EmpresasParceiras (
    CNPJ VARCHAR(14) PRIMARY KEY,
    Nome VARCHAR(40),
    Endereco VARCHAR(60),
    Telefone VARCHAR(20),
    fk_Empresa_CNPJ_Empresa VARCHAR(14),
    fk_Cadastro_IDCadastro INTEGER
);

CREATE TABLE Funcionario (
    CPF VARCHAR(12) PRIMARY KEY,
    Nome VARCHAR(40),
    Telefone VARCHAR(20),
    Endereco VARCHAR(60),
    Email VARCHAR(35),
    fk_Empresa_CNPJ_Empresa VARCHAR(14)
);

CREATE TABLE Empresa (
    CNPJ_Empresa VARCHAR(14) PRIMARY KEY,
    Nome VARCHAR(40)
);

CREATE TABLE Conteudo (
    IDConteudo INTEGER PRIMARY KEY,
    Nome VARCHAR(40),
    Categoria VARCHAR(25),
    fk_PalavraChave_PalavraChave_PK INTEGER,
    Descricao VARCHAR(150),
    Resumo VARCHAR(150),
    Texto VARCHAR(5000)
);

CREATE TABLE Atendimento_Atende (
    Protocolo INTEGER PRIMARY KEY,
    Data DATE,
    fk_Suporte_ao_Cliente_fk_Funcionario_CPF VARCHAR(12),
    fk_Cliente_IDCliente INTEGER
);

CREATE TABLE Cadastro (
    TipoUsuario VARCHAR(20),
    Senha VARCHAR(255),
    Login VARCHAR(50),
    IDCadastro INTEGER PRIMARY KEY,
    Data DATE
);

CREATE TABLE PalavraChave (
    PalavraChave_PK INTEGER NOT NULL PRIMARY KEY,
    PalavraChave VARCHAR(20)
);

CREATE TABLE Procura (
    fk_Cliente_IDCliente INTEGER,
    fk_EmpresasParceiras_CNPJ VARCHAR(14),
    Data DATE
);

CREATE TABLE Gerencia (
    fk_Conteudo_IDConteudo INTEGER,
    fk_Gerente_de_Conteudo_fk_Funcionario_CPF VARCHAR(12)
);

CREATE TABLE Visualiza (
    fk_Cliente_IDCliente INTEGER,
    fk_Conteudo_IDConteudo INTEGER
);
 
ALTER TABLE Cliente ADD CONSTRAINT FK_Cliente_2
    FOREIGN KEY (fk_Empresa_CNPJ_Empresa)
    REFERENCES Empresa (CNPJ_Empresa)
    ON DELETE CASCADE;
 
ALTER TABLE Cliente ADD CONSTRAINT FK_Cliente_3
    FOREIGN KEY (fk_Cadastro_IDCadastro)
    REFERENCES Cadastro (IDCadastro)
    ON DELETE CASCADE;
 
ALTER TABLE Administrador ADD CONSTRAINT FK_Administrador_2
    FOREIGN KEY (fk_Funcionario_CPF)
    REFERENCES Funcionario (CPF)
    ON DELETE CASCADE;
 
ALTER TABLE Administrador ADD CONSTRAINT FK_Administrador_3
    FOREIGN KEY (fk_Empresa_CNPJ_Empresa)
    REFERENCES Empresa (CNPJ_Empresa)
    ON DELETE RESTRICT;
 
ALTER TABLE Suporte_ao_Cliente ADD CONSTRAINT FK_Suporte_ao_Cliente_2
    FOREIGN KEY (fk_Funcionario_CPF)
    REFERENCES Funcionario (CPF)
    ON DELETE CASCADE;
 
ALTER TABLE Gerente_de_Conteudo ADD CONSTRAINT FK_Gerente_de_Conteudo_2
    FOREIGN KEY (fk_Funcionario_CPF)
    REFERENCES Funcionario (CPF)
    ON DELETE CASCADE;
 
ALTER TABLE EmpresasParceiras ADD CONSTRAINT FK_EmpresasParceiras_2
    FOREIGN KEY (fk_Empresa_CNPJ_Empresa)
    REFERENCES Empresa (CNPJ_Empresa)
    ON DELETE CASCADE;
 
ALTER TABLE EmpresasParceiras ADD CONSTRAINT FK_EmpresasParceiras_3
    FOREIGN KEY (fk_Cadastro_IDCadastro)
    REFERENCES Cadastro (IDCadastro)
	ON DELETE CASCADE;
    
ALTER TABLE Funcionario ADD CONSTRAINT FK_Funcionario_2
    FOREIGN KEY (fk_Empresa_CNPJ_Empresa)
    REFERENCES Empresa (CNPJ_Empresa)
    ON DELETE RESTRICT;
 
ALTER TABLE Conteudo ADD CONSTRAINT FK_Conteudo_2
    FOREIGN KEY (fk_PalavraChave_PalavraChave_PK)
    REFERENCES PalavraChave (PalavraChave_PK)
    ON DELETE NO ACTION;
 
ALTER TABLE Atendimento_Atende ADD CONSTRAINT FK_Atendimento_Atende_2
    FOREIGN KEY (fk_Suporte_ao_Cliente_fk_Funcionario_CPF)
    REFERENCES Suporte_ao_Cliente (fk_Funcionario_CPF);
 
ALTER TABLE Atendimento_Atende ADD CONSTRAINT FK_Atendimento_Atende_3
    FOREIGN KEY (fk_Cliente_IDCliente)
    REFERENCES Cliente (IDCliente);
 
ALTER TABLE Procura ADD CONSTRAINT FK_Procura_1
    FOREIGN KEY (fk_Cliente_IDCliente)
    REFERENCES Cliente (IDCliente)
    ON DELETE SET NULL;
 
ALTER TABLE Procura ADD CONSTRAINT FK_Procura_2
    FOREIGN KEY (fk_EmpresasParceiras_CNPJ)
    REFERENCES EmpresasParceiras (CNPJ)
    ON DELETE SET NULL;
 
ALTER TABLE Gerencia ADD CONSTRAINT FK_Gerencia_1
    FOREIGN KEY (fk_Conteudo_IDConteudo)
    REFERENCES Conteudo (IDConteudo)
    ON DELETE RESTRICT;
 
ALTER TABLE Gerencia ADD CONSTRAINT FK_Gerencia_2
    FOREIGN KEY (fk_Gerente_de_Conteudo_fk_Funcionario_CPF)
    REFERENCES Gerente_de_Conteudo (fk_Funcionario_CPF)
    ON DELETE SET NULL;
 
ALTER TABLE Visualiza ADD CONSTRAINT FK_Visualiza_1
    FOREIGN KEY (fk_Cliente_IDCliente)
    REFERENCES Cliente (IDCliente)
    ON DELETE SET NULL;
 
ALTER TABLE Visualiza ADD CONSTRAINT FK_Visualiza_2
    FOREIGN KEY (fk_Conteudo_IDConteudo)
    REFERENCES Conteudo (IDConteudo)
    ON DELETE SET NULL;
INSERT INTO Empresa (CNPJ_Empresa, Nome) VALUES
('12345678000195', 'Solar');

INSERT INTO Cadastro (TipoUsuario, Senha, Login, IDCadastro, Data) VALUES
('Cliente', 'senha123', 'Cliente1', 1, '2024-11-15'),
('Cliente', 'a@ad@123', 'Cliente2', 2, '2024-10-14'),
('Cliente', '1523@asd', 'Cliente3', 3, '2024-11-13'),
('Cliente', '59219@', 'Cliente3', 4, '2024-10-12'),
('Cliente', '310250a@', 'Cliente4', 5, '2024-11-11'),
('Cliente', 's2!!@5aa', 'Cliente5', 6, '2024-10-10'),
('Cliente', '315@asd22', 'Cliente6', 7, '2024-11-09'),
('Cliente', 'a2)$)2a2', 'Cliente7', 8, '2024-10-07'),
('Cliente', 'o5010o2', 'Cliente8', 9, '2024-10-06'),
('Cliente', 'senha123', 'Cliente9', 10, '2024-11-05'),
('Funcionario', '515ASD@', 'Func1', 11, '2024-08-30'),
('Funcionario', 'f23@@3', 'Func2', 12, '2024-05-23'),
('Funcionario', 'fu4@)10', 'Func3', 13, '2024-08-30'),
('Funcionario', 'f3510@3', 'Func4', 14, '2024-05-23'),
('Funcionario', '515b@56', 'Func5', 15, '2024-08-30'),
('EmpresaParceira', '115a@509', 'Emp1', 16, '2024-11-08'),
('EmpresaParceira', '240c@58', 'Emp2', 17, '2024-10-05');

INSERT INTO Funcionario (CPF, Nome, Telefone, Endereco, Email, fk_Empresa_CNPJ_Empresa) VALUES
('11111111111', 'João Silva', '31987654321', 'Rua A, 123', 'joao@solar.com', '12345678000195'),
('22222222222', 'Laura Santos', '31947654322', 'Rua B, 456', 'maria@solar.com', '12345678000195'),
('33333333333', 'Isaque Nascimento', '31387654321', 'Rua C, 123', 'isaque@solar.com', '12345678000195'),
('44444444444', 'Maria Silva', '31927654322', 'Rua D, 456', 'mariaS@solar.com', '12345678000195'),
('55555555555', 'Roberta Soares', '31917654321', 'Rua E, 123', 'roberta@solar.com', '12345678000195');

INSERT INTO Cliente (IDCliente, Email, Telefone, Endereco, Nome, fk_Empresa_CNPJ_Empresa, fk_Cadastro_IDCadastro) VALUES
(1, 'cliente1@dominio.com', '31987654323', 'Rua A, 789', 'Carlos Lima', '12345678000195', 1),
(2, 'cliente2@dominio.com', '31987634324', 'Rua B, 101', 'Fernanda Souza', '12345678000195', 2),
(3, 'cliente3@dominio.com', '31987614323', 'Rua C, 789', 'Roberto Loura', '12345678000195', 3),
(4, 'cliente4@dominio.com', '31987604324', 'Rua D, 101', 'Maria Eduarda', '12345678000195', 4),
(5, 'cliente5@dominio.com', '31987674323', 'Rua E, 789', 'Joel Carlos', '12345678000195', 5),
(6, 'cliente6@dominio.com', '31987614324', 'Rua F, 101', 'Joao lima', '12345678000195', 6),
(7, 'cliente7@dominio.com', '31987604323', 'Rua G, 789', 'Michael Ribeiro', '12345678000195', 7),
(8, 'cliente8@dominio.com', '31987623324', 'Rua H, 101', 'Maria Clara', '12345678000195', 8),
(9, 'cliente9@dominio.com', '31987655323', 'Rua I, 789', 'Gabriel Soares', '12345678000195', 9),
(10, 'cliente10@dominio.com', '31987694324', 'Rua J, 101', 'Lucas Souza', '12345678000195', 10);

INSERT INTO Administrador (fk_Funcionario_CPF, fk_Empresa_CNPJ_Empresa) VALUES
('11111111111', '12345678000195'),
('22222222222', '12345678000195');

INSERT INTO Suporte_ao_Cliente (fk_Funcionario_CPF) VALUES
('33333333333'),
('44444444444');

INSERT INTO Gerente_de_Conteudo (fk_Funcionario_CPF) VALUES
('55555555555');

INSERT INTO EmpresasParceiras (CNPJ, Nome, Endereco, Telefone, fk_Empresa_CNPJ_Empresa, fk_Cadastro_IDCadastro) VALUES
('11122333445566', 'EnergiaVerde', 'Rua E, 202', '31987654325', '12345678000195', 16),
('22233445566778', 'SolTech', 'Rua F, 303', '31987654326', '12345678000195', 17);

INSERT INTO PalavraChave (PalavraChave_PK, PalavraChave) VALUES
(1, 'instalação'),
(2, 'energia solar');

INSERT INTO Conteudo (IDConteudo, Nome, Categoria, fk_PalavraChave_PalavraChave_PK, Descricao, Resumo, Texto) VALUES
(1, 'Como instalar painéis solares', 'Instalação', 1, 'Guia completo para instalação de painéis solares.', 'Passo a passo para instalação de painéis solares', 'Texto detalhado de como instalar painéis solares com eficiência e segurança.'),
(2, 'Benefícios da energia solar', 'Informativo', 2, 'Artigo sobre os benefícios da energia solar.', 'Vantagens de utilizar energia solar em sua casa', 'Texto sobre como a energia solar pode reduzir custos e ser sustentável.');

INSERT INTO Atendimento_Atende (Protocolo, Data, fk_Suporte_ao_Cliente_fk_Funcionario_CPF, fk_Cliente_IDCliente) VALUES
(101, '2024-11-01', '33333333333', 1),
(102, '2024-11-02', '44444444444', 2),
(105, '2024-11-15', '33333333333', 5),
(106, '2024-11-27', '44444444444', 7),
(108, '2024-11-27', '44444444444', 7),
(103, '2024-10-03', '33333333333', 3),
(104, '2024-10-14', '44444444444', 3),
(107, '2024-10-13', '44444444444', 6);
(109, '2024-09-13', '44444444444', 6);


INSERT INTO Procura (fk_Cliente_IDCliente, fk_EmpresasParceiras_CNPJ, Data) VALUES
(1, '11122333445566', '2024-11-11'),
(3, '11122333445566', '2024-11-13'),
(4, '22233445566778', '2024-11-17'),
(5, '11122333445566', '2024-11-24'),
(2, '22233445566778', '2024-10-15'),
(4, '22233445566778', '2024-10-12'),
(3, '22233445566778', '2024-09-17'),
(1, '11122333445566', '2024-09-24');

INSERT INTO Gerencia (fk_Conteudo_IDConteudo, fk_Gerente_de_Conteudo_fk_Funcionario_CPF) VALUES
(1, '55555555555'),
(2, '55555555555');

INSERT INTO Visualiza (fk_Cliente_IDCliente, fk_Conteudo_IDConteudo) VALUES
(1, 1),
(2, 2),
(3, 2),
(2, 2),
(5, 2),
(4, 2),
(7, 1),
(8, 1),
(1, 1),
(4, 2);

-- Clientes atendidos pelo suporte ao cliente com a data do atendimento
SELECT C.IDCliente, suporte_ao_cliente.fk_Funcionario_CPF AS Funcionario, atendimento_atende.Data
FROM CLIENTE C
JOIN atendimento_atende ON C.IDCliente = atendimento_atende.fk_Cliente_IDCliente
JOIN suporte_ao_cliente ON atendimento_atende.fk_Suporte_ao_Cliente_fk_Funcionario_CPF = suporte_ao_cliente.fk_Funcionario_CPF;

-- Conteudos visualizados por cada cliente (Incluido os que não visualizaram conteudos)
SELECT C.IDCliente, Conteudo.IDConteudo, Conteudo.Nome
FROM cliente C
LEFT JOIN visualiza ON C.IDCliente = visualiza.fk_Cliente_IDCliente
LEFT JOIN Conteudo ON Conteudo.IDConteudo = visualiza.fk_Conteudo_IDConteudo;

-- Clientes que já foram atendidos pelo suporte ao cliente ou que visualizaram algum conteúdo
SELECT C.IDCliente
FROM cliente C
JOIN atendimento_atende ON atendimento_atende.fk_Cliente_IDCliente = C.IDCliente
UNION
Select C.IDCliente
FROM cliente C
JOIN visualiza ON visualiza.fk_Cliente_IDCliente = C.IDCliente;

-- Clientes que já visualizaram conteúdos mas nunca foram atendidos pelo suporte ao cliente
SELECT C.IDCliente
FROM Cliente C
JOIN visualiza ON C.IDCliente = visualiza.fk_Cliente_IDCliente
WHERE C.IDCliente NOT IN 
(SELECT C.IDCliente
FROM Cliente C
JOIN atendimento_atende ON C.IDCliente = atendimento_atende.fk_Cliente_IDCliente);

-- Clientes que já visualizaram conteudos e que já foram atendidos pelo suporte ao cliente
SELECT C.IDCliente
FROM Cliente C
JOIN visualiza ON C.IDCliente = visualiza.fk_Cliente_IDCliente
WHERE C.IDCliente IN 
(SELECT C.IDCliente
FROM Cliente C
JOIN atendimento_atende ON C.IDCliente = atendimento_atende.fk_Cliente_IDCliente);

-- Atendimentos que ocorreram na data do atendimento mais antigo com nome do funcionário e do cliente além da data.
SELECT A.Protocolo, Funcionario.Nome AS Funcionario, Cliente.Nome AS Cliente, A.Data
FROM atendimento_atende A
JOIN Funcionario ON Funcionario.CPF = A.fk_Suporte_ao_Cliente_fk_Funcionario_CPF
JOIN Cliente ON Cliente.IDCliente = A.fk_Cliente_IDCliente
Where A.Data IN 
(SELECT MIN(A.Data)
FROM atendimento_atende A);

-- Atendimentos que ocorreram na data do atendimento mais recente com nome do funcionário e do cliente além da data.
SELECT A.Protocolo, Funcionario.Nome AS Funcionario, Cliente.Nome AS Cliente, A.Data
FROM atendimento_atende A
JOIN Funcionario ON A.fk_Suporte_ao_Cliente_fk_Funcionario_CPF = Funcionario.CPF
JOIN Cliente ON A.fk_Cliente_IDCliente = Cliente.IDCliente
WHERE A.Data IN 
(SELECT MAX(A.Data)
FROM atendimento_atende A);

const express = require('express');
let app = express.Router();
const SQL = require('./DBScripts/SQL')

function autoLogin(req, res, next) {
    if (req.session.autenticado == true) {
        res.redirect('/perfil');
        console.log(res.session);
    } else {
        next();
    }
}

function authCheck (req, res, next) {
    if (!req.session.autenticado)
        res.redirect('/login');
    else if (req.session.user.Status != "aprovado"){
        res.redirect('/cadastroAguarde');
    } else {
        next();
    }
}

app.get('/perfil', authCheck, async (req, res) => {
    let user = req.session.user;

    let result = await SQL.Cliente.ObterPerfil(user.TipoUsuario, user.IDCadastro)
    if (result) {
        res.status(200).send([user, result]);
    } else {
        res.redirect("/404");
    }
})

app.get('/cliente', async (req, res) => {
    let result = await SQL.Cliente.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/cliente/:IDCadastro', async (req, res) => {
    let result = await SQL.Cliente.Get(req.params.IDCadastro);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/cadastro', async (req, res) => {
    let result = await SQL.Cadastro.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/cadastro/:login', async (req, res) => {
    let result = await SQL.Cadastro.Get(req.params.login);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/empresasparceiras', async (req, res) => {
    let result = await SQL.EmpresasParceiras.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/empresasparceiras/:nome', async (req, res) => {
    let result = await SQL.EmpresasParceiras.Get(req.params.nome);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/atendimento_atende', async (req, res) => {
    let result = await SQL.Atendimento_atende.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/atendimento_atende/:protocolo', async (req, res) => {
    let result = await SQL.Atendimento_atende.Get(req.params.protocolo);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/procura', async (req, res) => {
    let result = await SQL.Procura.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/procura/:IDCliente', async (req, res) => {
    let result = await SQL.Procura.Get(req.params.IDCliente);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/procura/:IDCliente/:IDEmpresaParceira', async (req, res) => {
    let result = await SQL.Procura.Get(req.params.IDCliente, req.params.IDEmpresaParceira);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/palavrachave', async (req, res) => {
    let result = await SQL.PalavraChave.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/palavrachave/nome/:nome', async (req, res) => {
    let result = await SQL.PalavraChave.GetByName(req.params.nome);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/palavrachave/id/:id', async (req, res) => {
    let result = await SQL.PalavraChave.Get(req.params.id);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/conteudo', async (req, res) => {
    let result = await SQL.Conteudo.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/conteudo/id/:id', async (req, res) => {
    let result = await SQL.Conteudo.Get(req.params.id);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/conteudo/nome/:nome', async (req, res) => {
    let result = await SQL.Conteudo.GetByName(req.params.nome);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/visualiza', async (req, res) => {
    let result = await SQL.Visualiza.GetAll();

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/entrega', async (req, res) => {
    let result = await SQL.Entrega.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/entrega/:nome', async (req, res) => {
    let result = await SQL.GetByName(req.params.nome);

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/feedback', async (req, res) => {
    let result = await SQL.Feedback.GetAll();

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.get('/feedback/:feedbackID', async (req, res) => {
    let result = await SQL.Feedback.Get(req.params.feedbackID);

    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({ sucess: false });
})

app.post('/login', async (req, res) => {
    let user = await SQL.Cadastro.Get(req.body.username)
    if (user && user.Senha == req.body.senha) {
        req.session.autenticado = true;
        req.session.user = user;
        res.redirect('/perfil');
    } else {
        res.status(404).send("Usuário Inválido");
    }
})

app.post('/registrar', async (req, res) => {
    if (req.body.nome == null || req.body.senha == null || req.body.email == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: nome, senha, email" });
        return
    }
    let result = await SQL.Cliente.Create(req.body.nome, req.body.senha, req.body.email);
    if (result) {
        console.log(result)
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/palavrachave', async (req, res) => {
    if (req.body.nome == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: nome/id " });
        return
    }
    let result = await SQL.PalavraChave.Create(req.body.nome);
    if (result) {
        console.log(result)
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/procura', async (req, res) => {
    if (req.body.idcliente == null || req.body.cnpj == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: idcliente e cnpj" });
        return
    }
    let result = await SQL.Procura.Create(req.body.idcliente, req.body.cnpj);
    if (result) {
        console.log(result)
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/visualiza', async (req, res) => {
    if (req.body.idcliente == null || req.body.idconteudo == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: idcliente e idconteudo" });
        return
    }
    let result = await SQL.Visualiza.Create(req.body.idcliente, req.body.idconteudo);
    if (result) {
        console.log(result)
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/conteudo', async (req, res) => {
    if (req.body.nome == null || req.body.categoria == null || req.body.palavrachave == null || req.body.descricao == null || req.body.resumo == null || req.body.texto == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: nome, categoria, palavrachave, descricao, resumo, texto " });
        return
    }
    let result = await SQL.Conteudo.Create(req.body.nome, req.body.categoria, req.body.palavrachave, req.body.descricao, req.body.resumo, req.body.texto);
    if (result) {
        console.log(result)
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/empresasparceiras', async (req, res) => {
    if (req.body.cnpj == null || req.body.nome == null || req.body.senha == null || req.body.endereco == null || req.body.telefone == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: cnpj, nome, endereco, telefone, senha" });
        return
    }
    let result = await SQL.EmpresasParceiras.Create(req.body.cnpj, req.body.nome, req.body.endereco, req.body.telefone, req.body.senha);
    if (result) {
        console.log(result)
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/feedback', async (req, res) => {
    if (req.body.funcionalidade == null || req.body.nota == null || req.body.descricao == null || req.body.idcliente == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: funcionalidade, nota, descricao, idcliente"});
        return
    }
    let result = await SQL.Feedback.Create(req.body.idcliente, req.body.funcionalidade, req.body.nota, req.body.descricao);
    if (result) {
        console.log(result)
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/update', authCheck, async (req, res) => {
    let result;
    switch (req.session.user.TipoUsuario.toLowerCase()) {
        case 'cliente': result = await SQL.Cliente.Update(req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.senha, req.body.idcliente, req.body.idcadastro); break;
        default: res.status(404).send({ success: false, error: "Tipo de Usuário inválido" }); return;
    }

    if (result) {
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/update/:tipoUsuario', authCheck, async (req, res) => {
    let result;
    switch (req.params.tipoUsuario.toLowerCase()) {
        case 'cliente': result = await SQL.Cliente.Update(req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.senha, req.body.idcliente, req.body.idcadastro); break;
        default: res.status(404).send({ success: false, error: "Tipo de usuário inválido" }); return;
    }

    if (result) {
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})



module.exports = app;
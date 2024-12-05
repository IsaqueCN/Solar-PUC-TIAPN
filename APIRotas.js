const express = require('express');
let app = express.Router();
const SQLFunctions = require('./DBScripts/SQL')

function autoLogin(req, res, next) {
    if (req.session.autenticado == true) {
        res.redirect('/perfil');
    } else {
        next();
    }
}

function authCheck(req, res, next) {
    if (!req.session.autenticado)
        res.redirect('/login');
    else {
        next();
    }
}

app.post('/login', async (req, res) => {
    let user = await SQLFunctions.Cadastro.Get(req.body.username)
    if (user && user.Senha == req.body.senha) {
        req.session.autenticado = true;
        req.session.user = user;
        res.redirect('/perfil');
    } else {
        res.status(404).send("Usuário Inválido");
    }
})

app.get('/perfil', authCheck, async (req, res) => {
    let user = req.session.user;

    let result = await SQLFunctions.Cliente.ObterPerfil(user.TipoUsuario, user.IDCadastro)
    if (result) {
        res.status(200).send([user, result]);
    } else {
        res.redirect("/404");
    }
})

app.get('/cliente/:IDCadastro', async (req, res) => {
    let result = await SQLFunctions.Cliente.Get(req.params.IDCadastro);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/cadastro/:login', async (req, res) => {
    let result = await SQLFunctions.Cadastro.Get(req.params.login);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/empresasparceiras/:nome', async (req, res) => {
    let result = await SQLFunctions.EmpresasParceiras.Get(req.params.nome);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/atendimento_atende/:protocolo', async (req, res) => {
    let result = await SQLFunctions.Atendimento_atende.Get(req.params.protocolo);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/procura/:IDCliente', async (req, res) => {
    let result = await SQLFunctions.Procura.Get(req.params.IDCliente);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/procura/:IDCliente/:IDEmpresaParceira', async (req, res) => {
    let result = await SQLFunctions.Procura.Get(req.params.IDCliente, req.params.IDEmpresaParceira);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/palavrachave/nome/:nome', async (req, res) => {
    let result = await SQLFunctions.PalavraChave.GetByName(req.params.nome);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/palavrachave/id/:id', async (req, res) => {
    let result = await SQLFunctions.PalavraChave.Get(req.params.id);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/conteudo/id/:id', async (req, res) => {
    let result = await SQLFunctions.Conteudo.Get(req.params.id);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.get('/conteudo/nome/:nome', async (req, res) => {
    let result = await SQLFunctions.Conteudo.GetByName(req.params.nome);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({ sucess: false });
    }
})

app.post('/palavrachave', async (req, res) => {
    if (req.body.nome == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: nome/id " });
        return
    }
    let result = await SQLFunctions.PalavraChave.Create(req.body.nome);
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
    let result = await SQLFunctions.Conteudo.Create(req.body.nome, req.body.categoria, req.body.palavrachave, req.body.descricao, req.body.resumo, req.body.texto);
    if (result) {
        console.log(result)
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})

app.post('/registrar', async (req, res) => {
    if (req.body.nome == null || req.body.senha == null || req.body.email == null) {
        res.status(404).send({ sucess: false, error: "Parametros necessários: nome, senha, email" });
        return
    }
    let result = await SQLFunctions.Cliente.Create(req.body.nome, req.body.senha, req.body.email);
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
    let result = await SQLFunctions.EmpresasParceiras.Create(req.body.cnpj, req.body.nome, req.body.endereco, req.body.telefone, req.body.senha);
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
        case 'cliente': result = await SQLFunctions.Cliente.Update(req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.senha, req.body.idcliente, req.body.idcadastro); break;
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
        case 'cliente': result = await SQLFunctions.Cliente.Update(req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.senha, req.body.idcliente, req.body.idcadastro); break;
        default: res.status(404).send({ success: false, error: "Tipo de usuário inválido" }); return;
    }

    if (result) {
        res.status(404).send({ success: false, error: result });
    }
    else
        res.status(200).send({ sucess: true });
})



module.exports = app;
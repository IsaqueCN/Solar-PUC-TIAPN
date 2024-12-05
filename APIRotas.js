const express = require('express');
let app = express.Router();
const SQLFunctions = require('./DBScripts/SQLFunctions')

function autoLogin (req, res, next) {
    if (req.session.autenticado == true) {
        res.redirect('/perfil');
    } else {
        next();
    }
}

function authCheck (req, res, next) {
    if (!req.session.autenticado)
        res.redirect('/login');
    else {
        next();
    }
}

app.post('/login', async (req, res) => {
    let user = await SQLFunctions.GetCadastro(req.body.username)
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

    let result = await SQLFunctions.ObterPerfil(user.TipoUsuario, user.IDCadastro)
    if (result) {
        res.status(200).send([user, result]);
    } else {
        res.redirect("/404");
    }
})

app.get('/cliente/:username', async (req, res) => {
    let result = await SQLFunctions.GetCliente(req.params.username);
    console.log(result);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({sucess: false});
    }
})

app.get('/cadastro/:username', async (req, res) => {
    let result = await SQLFunctions.GetCadastro(req.params.username);

    if (result) {
        result.sucess = true;
        res.status(200).send(result);
    } else {
        res.status(404).send({sucess: false});
    }
})

app.post('/registrar', async (req, res) => {
    let result = await SQLFunctions.CriarCliente(req.body.nome, req.body.senha, req.body.email);
    if (result) {
        console.log(result)
        res.status(404).send({success: false});
    }
    else
        res.status(200).send({sucess: true});
})

app.post('/update', authCheck, async (req, res) => {
    let result;
    switch (req.session.user.TipoUsuario.toLowerCase()) {
        case 'cliente': result = await SQLFunctions.AtualizarCliente(req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.senha, req.body.idcliente, req.body.idcadastro); break;
        default: res.status(404).send({success: false}); return;
    }

    if (result) {
        res.status(404).send({success: false});
    }
    else
        res.status(200).send({sucess: true});
})

app.post('/update/:tipoUsuario', authCheck, async (req, res) => {
    let result;
    switch (req.params.tipoUsuario.toLowerCase()) {
        case 'cliente': result = await SQLFunctions.AtualizarCliente(req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.senha, req.body.idcliente, req.body.idcadastro); break;
        default: res.status(404).send({success: false}); return;
    }

    if (result) {
        res.status(404).send({success: false});
    }
    else
        res.status(200).send({sucess: true});
})



module.exports = app;
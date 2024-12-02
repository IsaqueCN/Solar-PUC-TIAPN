const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

const connectionDB = require('./db')
const SQLFunctions = require('./SQLFunctions')
connectionDB();

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'something secret',
    esave: false,
    saveUninitialized: true,
}))

function autoLogin (req, res, next) {
    console.log(req.session.user);
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
app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + "/Telas/index.html")
})
app.get('/login', autoLogin, (req, res) => {
    res.status(200).sendFile(__dirname + "/Telas/login.html");
})

app.get('/registrar', autoLogin, (req, res) => {
    res.status(200).sendFile(__dirname + '/Telas/registrar.html');
})

app.get('/perfil', authCheck, (req, res) => {
    console.log(req.session)
    res.status(200).sendFile(__dirname + '/Telas/perfil.html')
})

app.get('/perfil/get', authCheck, async (req, res) => {
    let user = req.session.user;

    let result = await SQLFunctions.ObterPerfil(user.TipoUsuario, user.IDCadastro)
    if (result) {
        res.status(200).send([user, result]);
    } else {
        res.redirect("/404");
    }
})

app.get('/perfil/:username', async (req, res) => {
    let result = await SQLFunctions.encontrarUsuario(req.params.username);

    if (result) {
        res.status(200).send(result);
    } else {
        res.status(200).send({error: 'Não encontrado'});
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.post('/login', async (req, res) => {
    let user = await SQLFunctions.encontrarUsuario(req.body.username)
    
    if (user && user.Senha == req.body.senha) {
        req.session.autenticado = true;
        req.session.user = user;
        console.log(req.session)
        res.redirect('/perfil');
    } else {
        res.status(404).send("Usuário Inválido");
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

app.post('/updateCliente', async (req, res) => {
    let result = await SQLFunctions.AtualizarCliente(req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.body.senha, req.body.idcliente, req.body.idcadastro);
    if (result) {
        console.log(result)
        res.status(404).send({success: false});
    }
    else
        res.status(200).send({sucess: true});
})
app.all('*', (req, res) => {
    res.status(404).send("<h1>Página não encontrada</h1>");
})
app.listen(5000, () => {
    console.log("Escutando no port 5000, dir: ");
})
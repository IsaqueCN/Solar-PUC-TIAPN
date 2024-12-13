const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const connectionDB = require('./DBScripts/db')
const SQL = require('./DBScripts/SQL')
const rotasAPI = require('./APIRotas');
const PORT = 5000;

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'something secret',
    resave: false,
    saveUninitialized: true,
}))
app.use("/api", rotasAPI);

function autoLogin (req, res, next) {
    if (req.session.autenticado == true) {
        if (req.session.user.Status == "aprovado")
            res.redirect('/perfil');
        else
            res.redirect('/cadastroAguarde')
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
app.get('/', autoLogin, (req, res) => {
    res.status(200).sendFile(__dirname + "/Telas/index.html")
})
app.get('/login', autoLogin, (req, res) => {
    res.status(200).sendFile(__dirname + "/Telas/login.html");
})

app.get('/registrar', autoLogin, (req, res) => {
    res.status(200).sendFile(__dirname + '/Telas/registrar.html');
})

app.get('/perfil', authCheck, (req, res) => {
    res.status(200).sendFile(__dirname + '/Telas/perfil.html')
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.get('/cadastroAguarde', (req, res) => {
    res.status(200).sendFile(__dirname + '/Telas/aguardeCadastro.html');
})

app.all('*', (req, res) => {
    res.status(404).send("<h1>Página não encontrada</h1>");
})
app.listen(PORT, () => {
    console.log(`Escutando no port ${PORT}, localhost:${PORT}`);
})

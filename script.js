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
    cookie: { maxAge: 60000 },
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + "/Telas/index.html")
})
app.get('/login', (req, res) => {
    res.status(200).sendFile(__dirname + "/Telas/login.html");
})

app.get('/registrar', (req, res) => {
    res.status(200).sendFile(__dirname + '/Telas/registrar.html');
})

app.get('/perfil', (req, res) => {
    res.status(200).sendFile(__dirname + '/Telas/perfil.html')
})

app.get('/perfil/:username', async (req, res) => {
    let username = req.params.username;

    let result = await SQLFunctions.encontrarUsuario(username)
    if (result) {
        res.status(200).send(result);
    } else {
        res.redirect("/404");
    }
})
app.all('*', (req, res) => {
    res.status(404).send("<h1>Página não encontrada</h1>");
})
app.listen(5000, () => {
    console.log("Escutando no port 5000, dir: ");
})
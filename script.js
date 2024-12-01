const express = require('express');
const path = require('path');
const session = require('express-session');

let app = express();

app.use(express.static('public'));
app.use(session({
    secret: 'something secret',
    cookie: {maxAge: 60000},
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

app.all('*', (req, res) => {
    res.status(404).send("<h1>Página não encontrada</h1>");
})
app.listen(5000, () => {
    console.log("Escutando no port 5000, dir: ");
})
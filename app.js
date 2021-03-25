const express = require('express')
const app = express()
const port = 3000

app.get('/'), (req, res) => {
    res.send("Bem vindo")
}

app.get('/info', (req, res) => {
    res.send('Penshare é um aplicativo para compartilhar e contribuir com ideias')
})



module.exports = app;
const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.send("Hello");
})

module.exports = app;
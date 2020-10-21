
const express = require('express')
const app = express()

require('dotenv').config({debug: process.env.DEBUG});

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express')
const bodyParser = require('body-parser')
const server = express()


server.use(bodyParser.urlencoded({ extended: true}))
server.use(bodyParser.json())

module.exports = server
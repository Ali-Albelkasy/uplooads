const app = require('express').Router()


const login = require('../controller/login.controller')
app.post('/login',login)

const register = require('../controller/register.controller')
app.post('/register',register)

module.exports = app
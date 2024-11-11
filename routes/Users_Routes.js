const express = require('express');
const path = require('path');

const Users_Routes = express.Router();
const { getUsers, loginUser, logoutUser } = require('../controllers/Users_Controller');

Users_Routes.use(express.urlencoded({ extended: true })); 

// Rotas

Users_Routes.get('/getUsers', getUsers);

Users_Routes.get('/login', (req, res) => {
    res.render('login')
});

Users_Routes.get('/logout', logoutUser);

Users_Routes.post('/login', loginUser);


// Styles css

Users_Routes.get('/login-style', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'css', 'login', 'login.css'))
});


// JavaScript

Users_Routes.get('/login-js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'js', 'login', 'login.js'))
});


module.exports = Users_Routes;
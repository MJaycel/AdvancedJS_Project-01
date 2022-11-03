const express = require('express');
const router = express.Router();

const { 
    register, 
    login,
    getUsers
  } = require('../controllers/user_controller');

router
    .post('/register', register)
    .post('/login', login)
    .get('/',getUsers)

module.exports = router;
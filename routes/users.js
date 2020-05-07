const  router = require('express').Router();
const  express = require('express');
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAll);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;

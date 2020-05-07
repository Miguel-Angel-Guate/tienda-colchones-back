const  router = require('express').Router();
const  express = require('express');
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAll);
router.post('/register', UserController.register);

module.exports = router;

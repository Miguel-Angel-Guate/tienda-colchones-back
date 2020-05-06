const  router = require('express').Router();
const  express = require('express');
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.getAll);

module.exports = router;
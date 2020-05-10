const  router = require('express').Router();
const  express = require('express');
const {isAdmin, authentication } = require('../middleware/auth')

const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.getAll);
router.get('/:_id', ProductController.getById);
router.post('/',authentication,  isAdmin,  ProductController.create);


module.exports = router;
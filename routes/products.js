const  router = require('express').Router();
const  express = require('express');
const {isAdmin, authentication } = require('../middleware/auth')

const ProductController = require('../controllers/ProductController');

router.get('/:type', ProductController.getAllByType);
router.get('/:type/:_id', ProductController.getByTypeAndId);
router.post('/',authentication,  isAdmin,  ProductController.create);
router.patch('/:_id',authentication,  isAdmin, ProductController.update);
router.delete('/:_id',authentication,  isAdmin, ProductController.delete);


module.exports = router;
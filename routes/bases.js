const  router = require('express').Router();
const  express = require('express');
const {isAdmin, authentication } = require('../middleware/auth')

const BasesController = require('../controllers/BasesController');

router.get('/', BasesController.getAll);
router.get('/:_id', BasesController.getById);
router.delete('/:_id', BasesController.getById);
router.patch('/:_id', BasesController.getById);
router.post('/',authentication,  isAdmin,  BasesController.create);


module.exports = router;
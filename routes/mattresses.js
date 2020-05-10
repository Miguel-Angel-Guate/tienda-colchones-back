const  router = require('express').Router();
const  express = require('express');
const {isAdmin, authentication } = require('../middleware/auth')

const MattressesController = require('../controllers/MattressesController');

router.get('/', MattressesController.getAll);
router.get('/:_id', MattressesController.getById);
router.delete('/:_id', MattressesController.getById);
router.patch('/:_id', MattressesController.getById);
router.post('/',authentication,  isAdmin,  MattressesController.create);


module.exports = router;
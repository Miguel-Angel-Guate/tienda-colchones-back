const  router = require('express').Router();
const  express = require('express');
const {isAdmin, authentication } = require('../middleware/auth')

const RelevantsController = require('../controllers/RelevantsController');

router.get('/', RelevantsController.getAll);
router.get('/:_id', RelevantsController.getById);
router.delete('/:_id', RelevantsController.getById);
router.patch('/:_id', RelevantsController.getById);
router.post('/',authentication,  isAdmin,  RelevantsController.create);


module.exports = router;
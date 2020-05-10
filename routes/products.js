const  router = require('express').Router();
const {isAdmin, authentication } = require('../middleware/auth')

const ProductController = require('../controllers/ProductController');

router.get('/:kind', ProductController.getAllByKind);
router.get('/:kind/:_id', ProductController.getByKindAndId);
router.post('/',authentication,  isAdmin,  ProductController.create);
router.patch('/:_id',authentication,  isAdmin, ProductController.update);
router.delete('/:_id',authentication,  isAdmin, ProductController.delete);


module.exports = router;
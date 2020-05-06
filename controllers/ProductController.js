const Product = require('../models/Product')


const ProductController = {
       getAll(req, res) {
              Product.find()
              .then(products => res.send({ products, product: req.product}))
              .catch(console.error)
       }
}


module.exports = ProductController;
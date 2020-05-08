const Product = require('../models/Product')


const ProductController = {
       getAll(req, res) {
              Product.find()
              .then(products => res.send({ products, product: req.product}))
              .catch(console.error)
       },
     create(req, res){
            
            if(req.user.role == "admin") {
              Product.create({...req.body, user: req.user._id
              })
              .then(product => res.send({ product }))
            .catch(console.error)
            }
            
            
     }
}


module.exports = ProductController;
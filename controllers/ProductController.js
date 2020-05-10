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
            
            
     },
     getById(req, res) {
       Product.findById(req.params._id)
           
           .then(product => res.send(product))
           .catch(error => {
               console.error(error);
               res.send(error)
           })
   },
   patch(req, res) {
       Product.findOneAndUpdate(req.params._id)
       .then(product => res.send(product))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },
   delete(req, res){
          Product.findOneAndDelete(req.params._id)
          .then(product => res.send(product))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },

}


module.exports = ProductController;
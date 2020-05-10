const Product = require('../models/Product')


const ProductController = {
       getAllByType(req, res) {
              Product.find({type:req.params.type})
              .then(products => res.send(products))
              .catch(console.error)
       },
     create(req, res){
              Product.create({...req.body, user: req.user._id
              })
              .then(product => res.send({ product }))
            .catch(console.error)
     },
     getByTypeAndId(req, res) {
       Product.findOne({type:req.params.type,_id:req.params._id})
           .then(product => res.send(product))
           .catch(error => {
               console.error(error);
               res.send(error)
           })
   },
   update(req, res) {
       Product.findByIdAndUpdate(req.params._id,{
        ...req.body,
        user:req.user._id
      },{new:true})
       .then(product => res.send(product))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },
   delete(req, res){
          Product.findByIdAndDelete(req.params._id)
          .then(product => res.send(product))
           .catch(error => {
               console.error(error);
               res.send(error)
           });
   },
}

module.exports = ProductController;
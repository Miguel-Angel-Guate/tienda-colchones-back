const Product = require('../models/Product')


const ProductController = {
       getAllByKind(req, res) {
              Product.find({kind:req.params.kind})
              .then(products => res.send(products))
              .catch(console.error)
       },
       getAllByRelevant(req, res) {
           Product.find(({Relevant:true:req.params.relevant}))
           .then(product => res.send(products))
           .catch(console.error)
       },
     create(req, res){
              Product.create({...req.body, user: req.user._id
              })
              .then(product => res.send({ product }))
            .catch(console.error)
     },
     getByKindAndId(req, res) {
       Product.findOne({kind:req.params.kind,_id:req.params._id})
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
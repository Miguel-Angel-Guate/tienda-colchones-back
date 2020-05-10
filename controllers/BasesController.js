const Bases = require('../models/Bases')


const BasesController = {
       getAll(req, res) {
              Bases.find()
              .then(Bases => res.send({ Bases, base: req.base}))
              .catch(console.error)
       },
     create(req, res){
            
            if(req.user.role == "admin") {
              Bases.create({...req.body, user: req.user._id
              })
              .then(base => res.send({ base }))
            .catch(console.error)
            }
            
            
     },
     getById(req, res) {
       Bases.findById(req.params._id)
           
           .then(base => res.send(base))
           .catch(error => {
               console.error(error);
               res.send(error)
           })
   },
   patch(req, res) {
       Bases.findOneAndUpdate(req.params._id)
       .then(base => res.send(base))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },
   delete(req, res){
          Bases.findOneAndDelete(req.params._id)
          .then(mattress => res.send(base))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },

}


module.exports = BasesController;
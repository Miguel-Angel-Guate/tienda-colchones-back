const Mattresses = require('../models/Mattresses')


const MattressesController = {
       getAll(req, res) {
              Mattresses.find()
              .then(Mattresses => res.send({ Mattresses, mattress: req.mattress}))
              .catch(console.error)
       },
     create(req, res){
            
            if(req.user.role == "admin") {
              Mattresses.create({...req.body, user: req.user._id
              })
              .then(mattress => res.send({ mattress }))
            .catch(console.error)
            }
            
            
     },
     getById(req, res) {
       Mattresses.findById(req.params._id)
           
           .then(mattress => res.send(mattress))
           .catch(error => {
               console.error(error);
               res.send(error)
           })
   },
   patch(req, res) {
       Mattresses.findOneAndUpdate(req.params._id)
       .then(mattress => res.send(mattress))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },
   delete(req, res){
          Mattresses.findOneAndDelete(req.params._id)
          .then(mattress => res.send(mattress))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },

}


module.exports = MattressesController;
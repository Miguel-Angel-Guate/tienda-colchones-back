const Relevants = require('../models/Relevants')


const RelevantsController = {
       getAll(req, res) {
              Relevants.find()
              .then(Relevants => res.send({ Relevants, relevant: req.relevant}))
              .catch(console.error)
       },
     create(req, res){
            
            if(req.user.role == "admin") {
              Relevants.create({...req.body, user: req.user._id
              })
              .then(relevant => res.send({ relevant }))
            .catch(console.error)
            }
            
            
     },
     getById(req, res) {
       Relevants.findById(req.params._id)
           
           .then(relevant => res.send(relevant))
           .catch(error => {
               console.error(error);
               res.send(error)
           })
   },
   patch(req, res) {
       Relevants.findOneAndUpdate(req.params._id)
       .then(relevant => res.send(relevant))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },
   delete(req, res){
          Relevants.findOneAndDelete(req.params._id)
          .then(mattrelevant => res.send(relevant))
           .catch(error => {
               console.error(error);
               res.send(error)
           })

   },

}


module.exports = RelevantsController;
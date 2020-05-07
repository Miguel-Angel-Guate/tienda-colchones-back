const User = require('../models/User')
const bcrypt = require('bcryptjs');


const UserController = {
       getAll(req, res) {
              User.find()
              .then(users => res.send({ users, user: req.user}))
              .catch(console.error)
       },
      async register(req, res){
              try{
                     req.body.password = await bcrypt.hash(req.body.password, 9)
                     const user = await User.create(req.body);
                     res.status(201).send({
                            user,
                            message: 'user register successfully',
                            
                     })
              } catch (error) {
                     console.error(error)
                     res.status(500).send({
                            message: ' was some wrong with the user register',
                            error
                     })
              }

       }

//        {
              
//               register.create({...req.body})
//               .then(product => res.send({ product }))
//             .catch(console.error)
       
//        }
}


module.exports = UserController;
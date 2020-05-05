const User = require('../models/User')


const UserController = {
       getAll(req, res) {
              User.find()
              .then(users => res.send({ users, user: req.user}))
              .catch(console.error)
       }
}


module.exports = UserController;
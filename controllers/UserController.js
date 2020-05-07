const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_auth = require('../config/keys')




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

       },
       async login(req, res) {
              try {
                  const user = await User.findOne({
                      email: req.body.email
                  });
                  if (!user) {
                      return res.status(400).send({
                          message: 'Email o contraseña incorrectos'
                      })
                  }
                  const isMatch = bcrypt.compare(req.body.password, user.password);
                  if (!isMatch) {
                      return res.status(400).send({
                          message: 'Email o contraseña incorrectos'
                      })
                  }
                  const token = jwt.sign({
                      _id: user._id
                  }, jwt_auth);
                  if (user.tokens.length > 4) user.tokens.shift();
                  user.tokens.push(token);
                  await user.replaceOne(user);
                  res.send({
                      user,
                      token,
                      message: 'Conectado con éxito'
                  })
              } catch (error) {
                  console.error(error)
                  res.status(500).send({
                      message: 'Hubo un problema al intentar conectar'
                  })
              }
          },


}


module.exports = UserController;
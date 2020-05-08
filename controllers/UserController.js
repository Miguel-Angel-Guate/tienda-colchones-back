const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_auth = require('../config/keys')




const UserController = {
              getAll(req, res) {
                     User.find()
                            .then(users => res.send({
                                   users,
                                   user: req.user
                            }))
                            .catch(console.error)
              },
              async register(req, res) {
                     try {
                            const email =
                                   req.body.email
                            const emailToken = jwt.sign({
                                   email
                            }, jwt_auth, {
                                   expiresIn: '48h'
                            });
                            const url = API_URL + 'users/confirm/' + emailToken;
                            transporter.sendMail({
                                          to: email,
                                          subject: 'Validate your account in Beyond the Army',
                                          html: `
                         <h3>Welcome ${
req.body.name
} to Beyond the Army, only one more step</h3>
                         <a href="${url}">Click here and complete your register</a>
                         This link expire in 48 hours.
                         `
                                   })
                                   .then(res.status(201).send({
                                          user,
                                          message: 'We send you a confirmation email'
                                   }));
                            newUser = new User({
                                   ...req.body
                            });
                            bcrypt.hash(newUser.password, 10)
                                   .then(hash => {
                                          newUser.password = hash;
                                          return
                                          newUser.save();
                                   })
                                   .then(user => res.send({
                                          message: 'Registered ' +
                                                 user.name
                                   }))


                     } catch (error) {
                            console.error(error)
                            res.status(500).send({
                                   message: ' was some wrong with the user register',
                                   error
                            })

                     }



              },

              async confirm(req, res) {
                     try {
                            const emailToken = req.params.emailToken;
                            const payload = jwt.verify(emailToken, jwt_auth);
                            const email =
                                   payload.email;
                            // Mongoose findOneAndUpdate
                            const user = await User.findOneAndUpdate({
                                   email
                            }, {
                                   confirmed: true
                            })
                            const authToken = jwt.sign({
                                   id: user.id

                            }, jwt_auth);

                            await user.tokens.push(authToken);
                            await
                            user.save();

                            res.redirect('http://localhost:4200/user/confirmado/' + authToken);

                            }
                            catch (error) {
                                   console.error(error)
                                   res.status(500).send({
                                          message: 'Ha habido un problema al confirmar el usuario',
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
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwt_auth ,  FRONT_URL} = require('../config/keys')

const transporter = require('../config/nodemailer');




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
                     const url = FRONT_URL + 'users/confirm/' + emailToken;
                     await transporter.sendMail({
                            to: email,
                            subject: 'Validate your account in Ginzo colchones please',
                            html: `
                         <h3>Welcome ${
req.body.name
} to ginzo, we hope enjoy this time,  only one more step</h3>
                         <a href="${url}">Click here and complete your register</a>
                         This link expire in 48 hours.
                         `
                     })
                     const hash = await bcrypt.hash(req.body.password, 10)
                     const newUser = await User.create({
                            ...req.body,
                            password: hash,
                            role: 'user'
                           
                     });
                     res.status(201).send({
                            
                            message: 'We send you a confirmation email',
                            user:newUser
                     });
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

                     res.redirect(FRONT_URL + authToken);

              } catch (error) {
                     console.error(error)
                     res.status(500).send({
                            message: 'we had some wrong for the confirm the user',
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
                                   message: 'Email or pass invalid'
                            })
                     }
                     const isMatch = bcrypt.compare(req.body.password, user.password);
                     if (!isMatch) {
                            return res.status(400).send({
                                   message: 'Email or pass invalid, just check for the validate your profile'
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
                            message: 'succesffully connected'
                     })
              } catch (error) {
                     console.error(error)
                     res.status(500).send({
                            message: 'some wront to try the connect'
                     })
              }
       },


}


module.exports = UserController;
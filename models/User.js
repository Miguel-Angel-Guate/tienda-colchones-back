//import mongoose
const mongoose = require('mongoose');

// create the Schema
const UserSchema = new mongoose.Schema({
       name: String,
       role: String,

       email: {
              type: String,
              required: true,
              lowercase: true,
              unique: true
       },
       password: {
              type: String,
              required: true,
              trim: true,
              minlength: 7
       },
       tokens: []

});

const User = mongoose.model('User', UserSchema);
//export
module.exports = User;
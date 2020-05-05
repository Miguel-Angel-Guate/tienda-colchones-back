//import mongoose
const mongoose = require('mongoose');

// create the Schema
const UserSchema = new mongoose.Schema({
       name:String,
       role:{
              type:String,
              enum:['admin','customer']
       },
       email: {
              type:String,
              required:true,
             lowercase:true
       }
});

const User = mongoose.model('User',UserSchema);
//export
module.exports = User;
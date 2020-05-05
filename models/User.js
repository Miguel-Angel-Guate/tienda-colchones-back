const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
       name:String,
       role:{
              type:String,
              enum:['admin','customer']
       }
});

const User = mongoose.model('User',UserSchema);
module.exports = Product;
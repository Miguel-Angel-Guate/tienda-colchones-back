const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const BasesSchema = new mongoose.Schema({
       role:String,
       name:String,
       img:String,
       price:Number,
       relevant:Boolean,
       description:String,
       user: {
              type: ObjectId,
              ref: 'User'
          },
       
       
});

const Bases = mongoose.model('Bases', BasesSchema);
module.exports = Bases;
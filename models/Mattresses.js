const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const MattressesSchema = new mongoose.Schema({
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

const Mattresses = mongoose.model('Mattresses', MattressesSchema);
module.exports = Mattresses;
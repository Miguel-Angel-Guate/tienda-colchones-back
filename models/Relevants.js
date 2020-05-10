const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const RelevantsSchema = new mongoose.Schema({
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

const Relevants = mongoose.model('Relevants', RelevantsSchema);
module.exports = Relevants;
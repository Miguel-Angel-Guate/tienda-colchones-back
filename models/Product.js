const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema({
       role:String,
       name:String,
       kind:{
              type:String,
              enum:['colchones','somieres']
       },
       img:String,
       price:Number,
       relevant:Boolean,
       description:String,
       user: {
              type: ObjectId,
              ref: 'User'
          },
       
       
});

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;
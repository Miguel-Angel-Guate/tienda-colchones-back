const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
       name:String,
       kind:{
              type:String,
              enum:['colchones','somieres']
       },
       img:String,
       price:Number,
       
});

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;
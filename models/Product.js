const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema({
       name: {
              type: String,
              required: true
       },
       kind: {
              type: String,
              enum: ['mattress', 'bed']
       },
       img: String,
       price: {
              type: Number,
              required: true
       },
       relevant: Boolean,
       description: String,
       user: {
              type: ObjectId,
              ref: 'User'
       },


});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
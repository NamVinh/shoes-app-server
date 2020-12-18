const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    
    name: { type: String },
    price: { type: String },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
});

module.exports = mongoose.model('Product', Product);



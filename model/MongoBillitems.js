// models/BillItem.js
const mongoose = require('mongoose');

const MongoBillitems = new mongoose.Schema(
  {
    bill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mongoBill',
      required: true
    },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MongoStock', // Assuming you have a Stock model
      required: true
    },
    type: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    bundle: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MongoBillitems', MongoBillitems);

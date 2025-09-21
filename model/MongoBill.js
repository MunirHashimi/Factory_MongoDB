// models/Bill.js
const mongoose = require('mongoose');

const MongoBill= new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    ledger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mongoLedger',
      required: true
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mongoBillitems'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('MongoBill', MongoBill);

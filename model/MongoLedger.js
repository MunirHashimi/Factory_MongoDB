const mongoose = require('mongoose');

const mongoLedgerSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
});

const MongoLedger = mongoose.models.MongoLedger || mongoose.model('MongoLedger', mongoLedgerSchema);
module.exports = MongoLedger;
const mongoose = require('mongoose');

const mongoStockSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemType: { type: String, required: true },
    thickness: { type: Number, required: true },
    quantity: { type: Number, required: true }
}
, { timestamps: true }
);

const MongoStock = mongoose.models.MongoStock || mongoose.model('MongoStock', mongoStockSchema);
module.exports = MongoStock;



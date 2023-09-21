const mongoose = require('mongoose');
const {Schema} = mongoose;

const InventorySchema = new Schema ({
  businesssId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  itemName: String,
  price: { type: mongoose.Schema.Types.Decimal128 },
  cost: { type: mongoose.Schema.Types.Decimal128 },
  category: String,
  sku: String,
  stockCount: Number
});

const InventoryModel = mongoose.model('Inventory', InventorySchema);

module.exports = InventoryModel;
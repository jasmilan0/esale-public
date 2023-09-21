const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema ({
  businesssId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  dateTimeField: {
    type: Date,
    required: true, 
    default: Date.now,
  },
  subTotal: { type: mongoose.Schema.Types.Decimal128 },
  items: [
    {
      _id: false,
      count: Number,
      totalCost: { type: mongoose.Schema.Types.Decimal128 },
      item: {
        itemId: {type:mongoose.Schema.Types.ObjectId, ref:'Inventory'},
        itemName: String,
        price: { type: mongoose.Schema.Types.Decimal128 },
        cost: { type: mongoose.Schema.Types.Decimal128 },
        category: String,
        sku: String
      }
    }
  ]
  
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
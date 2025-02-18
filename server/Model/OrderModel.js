const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { 
    type: Number,
    unique: true
  },
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer', 
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  status: { type: String, default: 'Pending' }, // e.g., Pending, Delivered, Canceled
  totalAmount: { type: Number, require : true},
});

// Generate a unique orderId
OrderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastOrder = await Order.findOne().sort({ orderId: -1 }).exec();
    this.orderId = lastOrder ? lastOrder.orderId + 1 : 1001;  // Start from 101 if no orders exist
  }
  next();
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;

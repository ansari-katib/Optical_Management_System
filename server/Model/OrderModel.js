const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  status: { type: String, default: 'Pending' }, // e.g., Pending, Delivered, Canceled
  totalAmount: { type: Number, required: true },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;

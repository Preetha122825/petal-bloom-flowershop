const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String, image: String, price: Number,
    quantity: { type: Number, required: true, min: 1 },
  }],
  shippingAddress: { name: String, street: String, city: String, state: String, pincode: String, phone: String },
  paymentMethod:   { type: String, enum: ['card','upi','cod'], default: 'cod' },
  paymentStatus:   { type: String, enum: ['pending','paid','failed'], default: 'pending' },
  orderStatus:     { type: String, enum: ['Confirmed','Processing','Shipped','Out for Delivery','Delivered','Cancelled'], default: 'Confirmed' },
  itemsPrice:    { type: Number, required: true },
  shippingPrice: { type: Number, default: 0 },
  totalPrice:    { type: Number, required: true },
  deliveredAt:   Date,
  paidAt:        Date,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

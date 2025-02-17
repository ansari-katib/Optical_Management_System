const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true }, // e.g., Frames, Lenses, Accessories
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  brand: { type: String },
  image: { type: String }, // Optional: URL of the product image
  frameType: { type: String }, // For frames: e.g., Full Rim, Half Rim, Rimless
  lensType: { type: String }, // For lenses: e.g., Single Vision, Bifocal, Progressive
  color: { type: String }, // Frame color (if relevant)
  prescriptionRequired: { type: Boolean, default: false }, // For products that require a prescription (like lenses)
  prescriptionDetails: {
    rightEye: { type: Object }, // If prescription required, store details
    leftEye: { type: Object },  // e.g., Sphere, Cylinder, Axis for glasses
  },
  createdAt: { type: Date, default: Date.now }, // Track creation date
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

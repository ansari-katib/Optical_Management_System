const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  sph: { type: String, required: true },
  cyl: { type: String, required: true },
  axis: { type: String, required: true },
});

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  lastVisit: { type: Date },
  prescription: {
    rightEye: { type: PrescriptionSchema, required: true },
    leftEye: { type: PrescriptionSchema, required: true },
  },
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;

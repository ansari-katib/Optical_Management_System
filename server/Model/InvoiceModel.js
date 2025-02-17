const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    customerDetails: {
        customer: String,
        email: String,
        contact: String,
    },
    selectedProducts: [
        {
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    gst: Number,
    offer: Number,
    total: Number,
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;

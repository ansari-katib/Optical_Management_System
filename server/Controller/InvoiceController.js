const Invoice = require("../Model/InvoiceModel");
const Customer = require("../Model/CustomerModel");
const Order = require("../Model/OrderModel");
const Product = require("../Model/ProductModel");
const mongoose = require("mongoose");

const InvoiceInfo = async (req, res) => {
    try {
        const InvoiceData = await Invoice.find();
        res.json(InvoiceData);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const saveInvoiceData = async (req, res) => {
    try {
        const { customerDetails, selectedProducts, gst, offer, total } = req.body;

        // Check if customer already exists
        let customer = await Customer.findOne({ email: customerDetails.email });

        if (!customer) {
            // Create new customer if not found
            customer = new Customer({
                name: customerDetails.customer,
                contact: customerDetails.contact,
                email: customerDetails.email,
                lastVisit: new Date(), // Update last visit date
            });

            await customer.save();
        }

        // Create new order
        const order = new Order({
            customer: customer._id,
            products: selectedProducts,
            gst,
            offer,
            total,
            createdAt: new Date(),
        });

        await order.save();

        // Save invoice data in the Invoice collection
        const invoice = new Invoice({
            customerDetails: customerDetails,
            selectedProducts: selectedProducts,
            gst: gst,
            offer: offer,
            total: total,
        });

        await invoice.save();

        for (let product of selectedProducts) {
            console.log('Product Name:', product.name);  // Debugging log

            // Find product by name
            const existingProduct = await Product.findOne({ name: product.name });

            if (existingProduct) {
                console.log('Existing Product:', existingProduct);  // Debugging log

                // Check if there is enough stock
                if (existingProduct.stockQuantity >= product.quantity) {
                    // Deduct the stock
                    existingProduct.stockQuantity -= product.quantity;
                    await existingProduct.save();
                } else {
                    return res.status(400).json({ error: `Not enough stock for ${existingProduct.name}` });
                }
            } else {
                return res.status(404).json({ error: `Product with name ${product.name} not found` });
            }
        }

        res.status(201).json({ message: 'Invoice data saved successfully', order });
    } catch (error) {
        console.error('Error saving invoice:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { InvoiceInfo, saveInvoiceData };
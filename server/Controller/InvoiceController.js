require("dotenv").config(); // Load environment variables
const nodemailer = require("nodemailer");

const sendInvoiceEmail = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate("customerId");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Must match authenticated email
            to: order.customerId.email,
            subject: "Your Invoice",
            text: `Dear ${order.customerId.name}, attached is your invoice.`,
            attachments: [{ filename: `invoice-${orderId}.pdf`, path: `./invoices/invoice-${orderId}.pdf` }],
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");

        res.json({ message: "Invoice sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending invoice" });
    }
};

module.exports = { sendInvoiceEmail };

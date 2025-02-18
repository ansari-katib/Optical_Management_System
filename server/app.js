const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoDB = require("./db");

// Destructuring methods from controllers
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require("./Controller/CustomerController");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("./Controller/ProductController");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require("./Controller/OrderController");

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} = require("./Controller/AppointmentController");

const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser
} = require("./Controller/UserController");

const { 
  InvoiceInfo,
  saveInvoiceData
 } = require("./Controller/InvoiceController");


const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
MongoDB();

// user CRUD API:
app.post("/api/create-user", createUser);
app.get("/api/list-users", getAllUsers);
app.put("/api/update-user/:id", updateUser);
app.delete("/api/delete-user/:id", deleteUser);

// Customer CRUD API
app.post("/api/create-customer", createCustomer);
app.get("/api/customers", getCustomers);
app.get("/api/customer/:id", getCustomerById);
app.put("/api/update-customer/:id", updateCustomer);
app.delete("/api/delete-customer/:id", deleteCustomer);

// Product CRUD API
app.post("/api/create-product", createProduct);
app.get("/api/products", getProducts);
app.get("/api/product/:id", getProductById);
app.put("/api/update-product/:id", updateProduct);
app.delete("/api/delete-product/:id", deleteProduct);

// Order CRUD API
app.post("/api/create-order", createOrder);
app.get("/api/orders", getOrders);
app.get("/api/order/:id", getOrderById);
app.put("/api/update-order/:id", updateOrder);
app.delete("/api/delete-order/:id", deleteOrder);

// Appointment CRUD API
app.post("/api/create-appointment", createAppointment);
app.get("/api/appointments", getAppointments);
app.get("/api/appointment/:id", getAppointmentById);
app.put("/api/update-appointment/:id", updateAppointment);
app.delete("/api/delete-appointment/:id", deleteAppointment);

// invoice API
// app.get("/api/invoice/:orderId", sendInvoiceEmail);
app.get("/api/invoice-data",InvoiceInfo);
app.post("/api/save-invoice",saveInvoiceData);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

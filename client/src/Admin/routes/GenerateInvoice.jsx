import React, { useState, useEffect } from "react";
import AdminNavbar from "../Component/AdminNavbar";
import {
    Box,
    TextField,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GenerateInvoice = () => {
    const [customerDetails, setCustomerDetails] = useState({
        customer: "",
        email: "",
        contact: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [gst, setGst] = useState(0);
    const [offer, setOffer] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch(() => toast.error("Error fetching products. Please try again later."));
    }, []);

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails((prev) => ({ ...prev, [name]: value }));
    };

    const addProductToInvoice = () => {
        const product = products.find((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );

        if (product) {
            setSelectedProducts((prevProducts) => {
                const existingProduct = prevProducts.find((p) => p._id === product._id);

                if (existingProduct) {
                    return prevProducts.map((p) =>
                        p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
                    );
                }
                return [...prevProducts, { ...product, quantity: 1 }];
            });

            toast.success("Product added successfully!");
            setSearchQuery("");
        } else {
            toast.error("Product not found!");
        }
    };

    const handleQuantityChange = (id, quantity) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.map((p) =>
                p._id === id ? { ...p, quantity: parseInt(quantity, 10) || 1 } : p
            )
        );
    };

    const calculateTotal = () => {
        const subtotal = selectedProducts.reduce((total, p) => total + p.price * p.quantity, 0);
        const gstAmount = (subtotal * gst) / 100;
        const discount = (subtotal * offer) / 100;
        return subtotal + gstAmount - discount;
    };

    const handleGenerateInvoice = () => {
        const invoiceData = {
            customerDetails,
            selectedProducts,
            gst,
            offer,
            total: calculateTotal(),
        };

        fetch("http://localhost:5000/api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invoiceData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Invoice Response:", data); // Debugging
                if (data._id) {
                    toast.success(`Invoice generated! ID: ${data._id}`);
                } else {
                    toast.error("Invoice generated but missing ID!");
                }
            })
            .catch((error) => toast.error("Error generating invoice. Please try again later."));
    };

    return (
        <div className="h-screen flex flex-col">
            <AdminNavbar />
            <div className="flex flex-col flex-grow p-8 bg-gray-100">
                <ToastContainer position="top-right" autoClose={3000} />
                <Typography variant="h4" gutterBottom>Generate Invoice</Typography>
                <Box component="form" mb={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Customer Name" name="customer" value={customerDetails.customer} onChange={handleCustomerChange} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" name="email" value={customerDetails.email} onChange={handleCustomerChange} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Contact" name="contact" value={customerDetails.contact} onChange={handleCustomerChange} fullWidth variant="outlined" />
                        </Grid>
                    </Grid>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={4}>
                    <TextField label="Search Product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} variant="outlined" fullWidth />
                    <Button variant="contained" onClick={addProductToInvoice}>Add Product</Button>
                </Box>

                <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Product</strong></TableCell>
                                <TableCell><strong>Price</strong></TableCell>
                                <TableCell><strong>Quantity</strong></TableCell>
                                <TableCell><strong>Total</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedProducts.length > 0 ? (
                                selectedProducts.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>₹{product.price}</TableCell>
                                        <TableCell>
                                            <TextField type="number" value={product.quantity} onChange={(e) => handleQuantityChange(product._id, e.target.value)} variant="outlined" size="small" />
                                        </TableCell>
                                        <TableCell>₹{product.price * product.quantity}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No products added yet.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={2} mb={4}>
                    <Grid item xs={6}>
                        <TextField label="GST (%)" type="number" value={gst} onChange={(e) => setGst(e.target.value)} fullWidth variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Offer (%)" type="number" value={offer} onChange={(e) => setOffer(e.target.value)} fullWidth variant="outlined" />
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Total: ₹{calculateTotal()}</Typography>
                    <Button variant="contained" color="primary" onClick={handleGenerateInvoice}>Generate Invoice</Button>
                </Box>
            </div>
        </div>
    );
};

export default GenerateInvoice;

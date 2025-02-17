import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, IconButton } from '@mui/material';
import { Edit, Delete, Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Component/Sidebar';
import AdminNavbar from '../Component/AdminNavbar';

const InventoryManage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center flex-grow bg-gray-100">
                <CircularProgress />
            </div>
        );
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (product) => {
        setSelectedProduct({ ...product });
        setEditDialogOpen(true);
    };

    const handleDeleteClick = async (productId) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:5000/api/delete-product/${productId}`, { method: 'DELETE' });
                if (response.ok) {
                    setProducts(products.filter((product) => product._id !== productId));
                    toast.success('Product deleted successfully!');
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || 'Failed to delete product');
                }
            } catch (error) {
                toast.error('Error deleting product');
            }
        }
    };

    const handleCloseDialog = () => {
        setEditDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleSaveEdit = async () => {
        if (!selectedProduct || !selectedProduct._id) {
            toast.error('Product not selected or invalid data');
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/update-product/${selectedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedProduct),
            });
            const responseData = await response.json();

            if (response.ok) {
                const updatedProduct = responseData;
                setProducts(
                    products.map((product) =>
                        product._id === updatedProduct._id ? updatedProduct : product
                    )
                );
                handleCloseDialog();
                toast.success('Product updated successfully!');
            } else {
                toast.error(responseData.message || 'Failed to update product details');
            }
        } catch (error) {
            toast.error('Error saving product details');
        }
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleClear = () => {
        setSearchTerm("");
    };

    return (
        <div className="h-auto">
            <AdminNavbar />
            <div className='mt-4 ml-5'>
                <span className="font-bold py-1 px-5 border-2 border-gray-500 rounded-xl text-xl">Inventory Management</span>
            </div>
            <div className="p-4 bg-gray-200 mt-4 m-5 rounded-lg shadow-md">
                <TextField
                    label="Search Product"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClear}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="flex items-center m-5 justify-center bg-gray-100">
                <TableContainer component={Paper} className="mt-5 w-full mr-2 ml-2">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Product Price</TableCell>
                                <TableCell>Stock Quantity</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product, index) => (
                                <TableRow key={product._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.stockQuantity}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEditClick(product)}><Edit sx={{ color: "green" }} /></Button>
                                        <Button onClick={() => handleDeleteClick(product._id)}><Delete sx={{ color: "red" }} /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <>
                            <TextField label="Name" name="name" value={selectedProduct.name} onChange={handleProductChange} fullWidth margin="normal" />
                            <TextField label="Price" name="price" value={selectedProduct.price} onChange={handleProductChange} fullWidth margin="normal" />
                            <TextField label="Stock" name="stock" value={selectedProduct.stockQuantity} onChange={handleProductChange} fullWidth margin="normal" />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleSaveEdit} color="primary">Save Changes</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer autoClose={1000} />
        </div>
    );
};
export default InventoryManage;

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, IconButton } from '@mui/material';
import { Edit, Delete, Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../Component/AdminNavbar';

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow bg-gray-100">
        <CircularProgress />
      </div>
    );
  }

  const filteredOrders = orders.filter((order) =>
    order.orderId.toString().includes(searchTerm)
  );

  const handleEditClick = (order) => {
    setSelectedOrder({ ...order });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/delete-order/${orderId}`, { method: 'DELETE' });
        if (response.ok) {
          setOrders(orders.filter((order) => order._id !== orderId));
          toast.success('Order deleted successfully!');
        } else {
          toast.error('Failed to delete order');
        }
      } catch (error) {
        toast.error('Error deleting order');
      }
    }
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveEdit = async () => {
    if (!selectedOrder || !selectedOrder._id) {
      toast.error('Order not selected or invalid data');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/update-order/${selectedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedOrder),
      });
      const responseData = await response.json();

      if (response.ok) {
        setOrders(
          orders.map((order) => (order._id === responseData._id ? responseData : order))
        );
        handleCloseDialog();
        toast.success('Order updated successfully!', { autoClose: 1000 });
      } else {
        toast.error('Failed to update order');
      }
    } catch (error) {
      toast.error('Error saving order details');
    }
  };

  return (
    <div className="h-auto">
      <AdminNavbar />
      <div className='mt-4 ml-5'>
        <span className="font-bold py-1 px-5 border-2 border-gray-500 rounded-xl text-xl">Order Management Page</span>
      </div>
      <div className="p-4 bg-gray-200 mt-4 m-5 rounded-lg shadow-md">
        <TextField
          label="Search Order by ID"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm("")}> <ClearIcon /> </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="flex items-center m-5 justify-center bg-gray-100">
        <TableContainer component={Paper} className="mt-5 w-full">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.customerId}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditClick(order)}><Edit sx={{ color: "green" }} /></Button>
                    <Button onClick={() => handleDeleteClick(order._id)}><Delete sx={{ color: "red" }} /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <TextField
              label="Status"
              name="status"
              value={selectedOrder.status}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
              fullWidth
              margin="normal"
            />
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

export default ManageOrder;

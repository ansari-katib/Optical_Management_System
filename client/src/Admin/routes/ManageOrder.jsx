import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../Component/AdminNavbar';

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/invoice-data'); // Fetch data from the updated endpoint
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
    order._id.toString().includes(searchTerm) // Filtering by order _id
  );

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
                <TableCell>Customer Name</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>Offer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell> {/* Order ID */}
                  <TableCell>{order.customerDetails.customer}</TableCell> {/* Customer Name */}
                  <TableCell>${order.total}</TableCell> {/* Total Amount */}
                  <TableCell>{order.gst}%</TableCell> {/* GST */}
                  <TableCell>{order.offer}%</TableCell> {/* Offer */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default ManageOrder;

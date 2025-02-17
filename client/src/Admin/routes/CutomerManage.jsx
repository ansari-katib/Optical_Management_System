import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, IconButton } from '@mui/material';
import { Edit, Delete, Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the styles for the toast notifications
// import Sidebar from '../../Component/Sidebar';
import AdminNavbar from '../Component/AdminNavbar';

const CutomerManage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  //* fetching all customers api :
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow bg-gray-100">
        <CircularProgress />
      </div>
    );
  }

  const filteredCustomers = customers.filter((customer) => {
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEditClick = (customer) => {
    setSelectedCustomer({ ...customer });
    setEditDialogOpen(true);
  };

  //* delete api:
  const handleDeleteClick = async (customerId) => {
    const confirmed = window.confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/delete-customer/${customerId}`, { method: 'DELETE' });
        if (response.ok) {
          setCustomers(customers.filter((customer) => customer._id !== customerId));
          toast.success('Customer deleted successfully!'); // Show success toast
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to delete customer'); // Show error toast
        }
      } catch (error) {
        toast.error('Error deleting customer'); // Show error toast
      }
    }
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedCustomer(null);
  };

  //* update api :c
  const handleSaveEdit = async () => {
    if (!selectedCustomer || !selectedCustomer._id) {
      toast.error('Customer not selected or invalid data');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/update-customer/${selectedCustomer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCustomer),
      });
      const responseData = await response.json();

      if (response.ok) {
        const updatedCustomer = responseData.user || responseData;
        setCustomers(
          customers.map((customer) =>
            customer._id === updatedCustomer._id ? updatedCustomer : customer
          )
        );
        handleCloseDialog();
        toast.success('Customer updated successfully!', { autoClose: 1000 }); // Show success toast
      } else {
        toast.error(responseData.message || 'Failed to update customer details'); // Show error toast
      }
    } catch (error) {
      toast.error(error.message || 'Error saving customer details'); // Show error toast
    }
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className=" h-auto">
      {/* <div className="bg-gray-800 text-white">
        <Sidebar />
      </div> */}
      <div className="flex flex-col">
        <div>
          <AdminNavbar />
        </div>
        <div className='mt-4 ml-5 ' >
          <span className="font-bold py-1 px-5 border-2 border-gray-500 rounded-xl text-xl">Customer Management page</span>
        </div>
        <div className="p-4 bg-gray-200 mt-4 m-5 rounded-lg shadow-md">
          <TextField
            label="Search Customer"
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                paddingRight: "10px",
              },
              "& .MuiInputLabel-root": {
                fontWeight: "600",
              },
            }}
          />
        </div>
        <div className="flex items-center m-5 justify-center bg-gray-100">
          <TableContainer component={Paper} className="mt-5 w-full mr-2 ml-2 ">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Last Visit</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow key={customer._id}>
                    <TableCell>{index + 100001}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.contact}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.lastVisit}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditClick(customer)}><Edit sx={{ color: "green" }} /></Button>
                      <Button onClick={() => handleDeleteClick(customer._id)}><Delete sx={{ color: "red" }} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Edit Customer Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <>
              <TextField
                label="Name"
                name="name"
                value={selectedCustomer.name}
                onChange={handleCustomerChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contact"
                name="contact"
                value={selectedCustomer.contact}
                onChange={handleCustomerChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={selectedCustomer.email}
                onChange={handleCustomerChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Visit"
                name="lastVisit"
                value={selectedCustomer.lastVisit}
                onChange={handleCustomerChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification Container */}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default CutomerManage;

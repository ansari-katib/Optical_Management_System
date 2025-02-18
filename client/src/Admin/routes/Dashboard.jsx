import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Component/AdminNavbar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    // State to hold the fetched data
    const [ordersData, setOrdersData] = useState(null);
    const [inventoryData, setInventoryData] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching the API data for the dashboard
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Orders, Inventory, and Customer Data from your API
                const ordersResponse = await fetch('http://localhost:5000/api/orders');
                const orders = await ordersResponse.json();

                const inventoryResponse = await fetch('http://localhost:5000/api/products');
                const inventory = await inventoryResponse.json();

                const customerResponse = await fetch('http://localhost:5000/api/customers');
                const customers = await customerResponse.json();

                // Setting state after successful fetch
                setOrdersData(orders);
                setInventoryData(inventory);
                setCustomerData(customers);
            } catch (error) {
                setError("Error fetching data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Options for the Bar Chart
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Dashboard Analytics',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    // Transform Orders Data for Chart (Show total number of orders)
    const transformOrdersData = (ordersData) => {
        // Count the number of orders per day or per month (based on the order date)
        const ordersCountByDate = ordersData.reduce((acc, order) => {
            const orderDate = new Date(order.date); // Assuming order has a 'date' field
            const monthYear = orderDate.toLocaleString('default', { year: 'numeric', month: 'long' }); // Grouping by Month-Year
            acc[monthYear] = (acc[monthYear] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(ordersCountByDate),
            datasets: [{
                label: 'Total Orders',
                data: Object.values(ordersCountByDate),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };
    };

    // Transform Customer Data for Chart
    const transformCustomerData = (customerData) => {
        const customerGrowthData = customerData.reduce((acc, customer) => {
            const lastVisitMonth = new Date(customer.lastVisit).toLocaleString('default', { month: 'long' });
            acc[lastVisitMonth] = (acc[lastVisitMonth] || 0) + 1;
            return acc;
        }, {});
        return {
            labels: Object.keys(customerGrowthData),
            datasets: [{
                label: 'Customer Growth',
                data: Object.values(customerGrowthData),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        };
    };

    // Transform Inventory Data for Chart
    const transformInventoryData = (inventoryData) => {
        return {
            labels: inventoryData.map(item => item.name),
            datasets: [{
                label: 'Inventory Stock',
                data: inventoryData.map(item => item.stockQuantity),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        };
    };

    // Display a loading spinner or error if needed
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-400">
            <div className="flex flex-col ">
                <div>
                    <AdminNavbar />
                </div>
                <div className='mt-4 ml-5 ' >
                    <span className="font-bold py-1 px-5 border-2 border-gray-500 rounded-xl text-xl"> Dashboard page</span>
                </div>
                <div className="flex items-center justify-center flex-grow mt-20 ">
                    <div className="w-full max-w-7xl p-6 bg-gray-500 shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Orders Chart */}
                        <div className="chart-container bg-blue-50 p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Analytics</h2>
                            {/* Check if ordersData is available */}
                            {ordersData ? <Bar data={transformOrdersData(ordersData)} options={options} /> : <p>Data not available</p>}
                        </div>

                        {/* Inventory Chart */}
                        <div className="chart-container bg-green-50 p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Inventory Status</h2>
                            {/* Check if inventoryData is available */}
                            {inventoryData ? <Bar data={transformInventoryData(inventoryData)} options={options} /> : <p>Data not available</p>}
                        </div>

                        {/* Customer Growth Chart */}
                        <div className="chart-container bg-purple-50 p-4 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Growth</h2>
                            {/* Check if customerData is available */}
                            {customerData ? <Bar data={transformCustomerData(customerData)} options={options} /> : <p>Data not available</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

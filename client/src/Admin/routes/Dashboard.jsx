import React from 'react';
import Sidebar from '../Component/Sidebar';
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
    // Sample data for Orders, Inventory, and Customers
    const ordersData = {
        labels: ['January', 'February', 'March', 'April', 'May'], // Labels for x-axis
        datasets: [
            {
                label: 'Orders Received',
                data: [10, 25, 35, 50, 40], // Order data points
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

    const inventoryData = {
        labels: ['sun glasses', 'reading glasses', 'computer glasses', 'fashion glasses'], // Labels for x-axis
        datasets: [
            {
                label: 'Inventory Stock',
                data: [120, 150, 80, 60], // Inventory data points
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            }
        ]
    };

    const customerData = {
        labels: ['New Customers', 'Returning Customers'], // Labels for customer status
        datasets: [
            {
                label: 'Customer Growth',
                data: [200, 150], // Customer data points
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }
        ]
    };

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

    return (
        <div className="h-screen">
            <div className="flex flex-col">
                <div>
                    <AdminNavbar />
                </div>
                <div className="flex items-center justify-center flex-grow bg-gray-100">
                    <div className="w-full max-w-7xl p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="chart-container">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Analytics</h2>
                            <Bar data={ordersData} options={options} />
                        </div>
                        <div className="chart-container">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Inventory Status</h2>
                            <Bar data={inventoryData} options={options} />
                        </div>
                        <div className="chart-container">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Growth</h2>
                            <Bar data={customerData} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

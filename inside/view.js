import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        fetch('/api/sales')
            .then(response => response.json())
            .then(data => setSalesData(data))
            .catch(error => console.error('Error fetching sales data:', error));
    }, []);

    const labels = salesData.map(sale => sale.month);
    const data = salesData.map(sale => sale.amount);

    const chartData = {
        labels,
        datasets: [{
            label: 'Monthly Sales',
            data,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <h1>Monthly Sales</h1>
            <Bar data={chartData} />
        </div>
    );
};

export default Dashboard;

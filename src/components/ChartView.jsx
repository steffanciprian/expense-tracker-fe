import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import '../css/ChartView.css';

const data = [
    { name: 'Food', value: 250 },
    { name: 'Rent', value: 500 },
    { name: 'Entertainment', value: 150 },
];

const COLORS = ['#FF8042', '#00C49F', '#FFBB28'];

const ChartView = () => {
    return (
        <div className="chart-container">
            <h3>Spending by Category</h3>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default ChartView;

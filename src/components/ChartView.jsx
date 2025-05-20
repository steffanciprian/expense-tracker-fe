import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useExpenses } from './ExpenseContext';
import '../css/ChartView.css';

const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#8884d8', '#82ca9d', '#ffc658'];

const ChartView = () => {
    const { expenses } = useExpenses();

    const totalsByCategory = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!category) return acc;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    const data = Object.entries(totalsByCategory).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div className="chart-container">
            <h3>Spending by Category</h3>
            {data.length === 0 ? (
                <p>No data to display.</p>
            ) : (
                <PieChart width={300} height={320}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="45%"
                        outerRadius={90}
                        dataKey="value"
                        isAnimationActive={true}
                        animationDuration={800}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            )}
        </div>
    );
};

export default ChartView;

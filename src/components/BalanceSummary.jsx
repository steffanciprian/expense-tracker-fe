import React from 'react';
import '../css/BalanceSummary.css';

const BalanceSummary = ({ onAddExpense }) => {
    return (
        <div className="balance-header">
            <h2>Balance Summary</h2>
            <button className="add-expense-btn" onClick={onAddExpense}>
                ➕ Add Expense
            </button>
        </div>
    );
};

export default BalanceSummary;

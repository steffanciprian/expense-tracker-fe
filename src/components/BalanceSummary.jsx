import React from 'react';
import '../css/BalanceSummary.css';
import '../css/common.css';

const BalanceSummary = ({ onAddExpense }) => {
    return (
        <div className="action-buttons">
            <button className="add-expense-btn" onClick={onAddExpense}>
                ➕ Add Expense
            </button>
            <button className="download-btn" onClick={() => alert("PDF export coming soon!")}>
                📄 Download PDF
            </button>
        </div>

    );
};

export default BalanceSummary;

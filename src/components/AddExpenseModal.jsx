import React, { useState } from 'react';
import '../css/AddExpenseModal.css';
import { addExpense } from '../services/expenseService';
import { useExpenses } from "./ExpenseContext";

const AddExpenseModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState('expense');
    const { setExpenses } = useExpenses();

    const categories = [
        "FOOD", "TRANSPORT", "UTILITIES", "ENTERTAINMENT", "TRAVEL",
        "HEALTHCARE", "EDUCATION", "SUPPLIES", "RENT", "SALARY",
        "INSURANCE", "TAXES", "GIFTS", "MAINTENANCE", "OTHER"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newExpense = await addExpense({
                name,
                amount: parseFloat(amount),
                description: notes,
                date,
                category,
                type
            });

            setExpenses(prev => [...prev, newExpense]);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    // const handleMockAdd = () => {
    //     const mockExpense = {
    //         id: `mock-${Date.now()}`,
    //         name,
    //         amount: parseFloat(amount),
    //         description: notes,
    //         date,
    //         category,
    //         type
    //     };
    //     setExpenses(prev => [...prev, mockExpense]);
    //     onClose();
    // };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2 style={{ color: type === 'expense' ? '#e74c3c' : '#2ecc71' }}>
                    Add {type === 'expense' ? 'Expense' : 'Income'}
                </h2>

                <div className="type-toggle">
                    <button
                        type="button"
                        className={type === 'expense' ? 'active' : ''}
                        onClick={() => setType('expense')}
                    >
                        💸 Expense
                    </button>
                    <button
                        type="button"
                        className={type === 'income' ? 'active' : ''}
                        onClick={() => setType('income')}
                    >
                        💰 Income
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />

                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                    />

                    <div className="modal-actions">
                        <button type="submit">Add</button>
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    onClick={handleMockAdd}*/}
                        {/*    style={{*/}
                        {/*        backgroundColor: '#ccc',*/}
                        {/*        color: '#333',*/}
                        {/*        padding: '0.4rem 0.8rem',*/}
                        {/*        borderRadius: '6px',*/}
                        {/*        border: 'none',*/}
                        {/*        cursor: 'pointer'*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    ⚡ Mock Add*/}
                        {/*</button>*/}
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;

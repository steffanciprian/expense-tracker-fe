import React, { useState, useEffect } from 'react';
import '../css/AddExpenseModal.css';
import { updateExpense } from '../services/expenseService';
import { useExpenses } from './ExpenseContext';

const EditExpenseModal = ({ isOpen, onClose, expense }) => {
    const { setExpenses } = useExpenses();

    const [form, setForm] = useState({
        name: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        type: ''
    });

    useEffect(() => {
        if (expense) {
            setForm({
                name: expense.name,
                amount: expense.amount,
                date: expense.date,
                category: expense.category,
                description: expense.description || '',
                type: expense.type
            });
        }
    }, [expense]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateExpense(expense.id, {
                ...form,
                amount: parseFloat(form.amount)
            });

            setExpenses(prev =>
                prev.map(e =>
                    e.id === expense.id
                        ? { ...e, ...form, amount: parseFloat(form.amount) } // preserve ID and patch fields
                        : e
                )
            );

            onClose();
        } catch (err) {
            console.error(err);
        }
    };


    if (!isOpen || !expense) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Edit {form.type === 'expense' ? 'Expense' : 'Income'}</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
                    <input name="date" type="date" value={form.date} onChange={handleChange} />

                    <select name="category" value={form.category} onChange={handleChange} required>
                        <option value="" disabled>Select category</option>
                        {["FOOD", "TRANSPORT", "UTILITIES", "ENTERTAINMENT", "RENT", "SALARY", "OTHER"].map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <textarea name="description" placeholder="Notes" value={form.description} onChange={handleChange} />
                    <div className="modal-actions">
                        <button type="submit">Update</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditExpenseModal;

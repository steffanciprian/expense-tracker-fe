import { useState } from 'react';
import '../css/ExpenseForm.css';

const ExpenseForm = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, amount });
        setName('');
        setAmount('');
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Expense name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button type="submit">+ Add Expense</button>
        </form>
    );
};

export default ExpenseForm;

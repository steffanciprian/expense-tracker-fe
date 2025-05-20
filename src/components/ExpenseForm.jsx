import {useState} from 'react';
import '../css/ExpenseForm.css';
import {addExpense} from "../services/expenseService";

const ExpenseForm = () => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // default to today
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addExpense({
                name,
                amount: parseFloat(amount),
                description: '',
                date
            })

            setName('');
            setAmount('');
            setDate(new Date().toISOString().split('T')[0]);
            setSuccessMessage('Expense added successfully!')
            setTimeout(() => setSuccessMessage(''), 1500);

        } catch (error) {
            console.error(error);
        }


    };

    return (

        <form className="expense-form" onSubmit={handleSubmit}>
            {successMessage && (
                <div className="success-message"> {successMessage} </div>
            )
            }
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
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="date-input"
            />
            <button type="submit">+ Add Expense</button>
        </form>
    )
        ;
};

export default ExpenseForm;

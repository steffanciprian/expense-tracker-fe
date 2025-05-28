import { createContext, useContext, useState, useEffect } from 'react';
import { getExpenses } from '../services/expenseService';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            setLoading(false);
            return;
        }

        getExpenses()
            .then(data => {
                setExpenses(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);


    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses, loading }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpenses = () => useContext(ExpenseContext);

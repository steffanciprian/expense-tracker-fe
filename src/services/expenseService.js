import axios from "axios";

const BASE_URL = 'http://localhost:8080/expenses';

// expenseService.js
export const addExpense = async (expense) => {
    const res = await axios.post('http://localhost:8080/expenses', expense);
    return res.data; // ✅ returns the created expense
};

export const getExpenses = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}
import axios from "axios";

const BASE_URL = 'http://localhost:8080/expenses';

export const addExpense = async (expense) => {
    const res = await axios.post('http://localhost:8080/expenses', expense);
    return res.data; // ✅ returns the created expense
};

export const getExpenses = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export const deleteExpense = async (id) => {
    return axios.delete(`http://localhost:8080/expenses/${id}`);
};

export const updateExpense = async (id, updatedExpense) => {
    const res = await axios.put(`http://localhost:8080/expenses/${id}`, updatedExpense);
    return res.data;
};

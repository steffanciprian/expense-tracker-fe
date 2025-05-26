import axios from "axios";

const BASE_URL = 'https://expense-tracker-y9kx.onrender.com/expenses';

export const addExpense = async (expense) => {
    const res = await axios.post(BASE_URL, expense);
    return res.data;
};

export const getExpenses = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const deleteExpense = async (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

export const updateExpense = async (id, updatedExpense) => {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedExpense);
    return res.data;
};

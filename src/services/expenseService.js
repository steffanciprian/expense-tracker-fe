import axios from "axios";

const BASE_URL = 'http://localhost:8080/expenses';

export const addExpense = async (expense) => {
    return axios.post(BASE_URL, expense);
}

export const getExpenses = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}
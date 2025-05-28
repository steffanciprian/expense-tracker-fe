import axios from "axios";

const BASE_URL = "https://expense-tracker-y9kx.onrender.com/expenses";

export const addExpense = async (expense) => {
    const token = localStorage.getItem("jwtToken");

    const res = await axios.post(BASE_URL, expense, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const getExpenses = async () => {
    const token = localStorage.getItem("jwtToken");

    const res = await axios.get(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const deleteExpense = async (id) => {
    const token = localStorage.getItem("jwtToken");

    const res = await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const updateExpense = async (id, updatedExpense) => {
    const token = localStorage.getItem("jwtToken");

    const res = await axios.put(`${BASE_URL}/${id}`, updatedExpense, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

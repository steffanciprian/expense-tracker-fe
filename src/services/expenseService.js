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

// expenseService.js
export const getExpenses = async (filter = 'all') => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get(`https://expense-tracker-y9kx.onrender.com/expenses?filter=${filter}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
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

export const getExpensesCustomRange = async (startDate, endDate) => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get(BASE_URL, {
        params: { startDate, endDate },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


import { useEffect, useState } from "react";
import { useExpenses } from "./ExpenseContext";
import axios from "axios";
import "../css/SummaryTiles.css";

const SummaryTiles = () => {
    const { expenses } = useExpenses();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currency, setCurrency] = useState("RON");
    const [converted, setConverted] = useState({
        income: null,
        expenses: null,
        balance: null,
    });

    // Calculate totals
    const totalExpenses = Array.isArray(expenses)
        ? expenses
            .filter((e) => e.type === "expense")
            .reduce((sum, e) => sum + e.amount, 0)
        : 0;

    const totalIncome = Array.isArray(expenses)
        ? expenses
            .filter((e) => e.type === "income")
            .reduce((sum, e) => sum + e.amount, 0)
        : 0;

    const balance = totalIncome - totalExpenses;

    useEffect(() => {
        if (!Array.isArray(expenses)) return;

        const convert = async () => {
            try {
                if (currency === "RON") {
                    setConverted({
                        income: totalIncome,
                        expenses: totalExpenses,
                        balance,
                    });
                    return;
                }

                // ✅ Use full URL to ensure backend is reached (adjust if needed)
                const backendUrl = "http://localhost:8080/api/rates/convert";

                const [incomeRes, expensesRes, balanceRes] = await Promise.all([
                    axios.get(backendUrl, {
                        params: { amount: totalIncome, from: "RON", to: currency },
                    }),
                    axios.get(backendUrl, {
                        params: { amount: totalExpenses, from: "RON", to: currency },
                    }),
                    axios.get(backendUrl, {
                        params: { amount: balance, from: "RON", to: currency },
                    }),
                ]);

                setConverted({
                    income: parseFloat(incomeRes.data),
                    expenses: parseFloat(expensesRes.data),
                    balance: parseFloat(balanceRes.data),
                });
            } catch (error) {
                console.error("Currency conversion failed:", error);
                alert("⚠️ Could not convert currency. Check backend or try again later.");
                // fallback to RON
                setCurrency("RON");
                setConverted({
                    income: totalIncome,
                    expenses: totalExpenses,
                    balance,
                });
            }
        };

        convert();
    }, [currency, expenses]);

    if (!Array.isArray(expenses)) return null;

    return (
        <>
            <button className="summary-toggle-btn" onClick={() => setIsModalOpen(true)}>
                Show Summary
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖️</button>

                        <div className="currency-selector">
                            <label>Select Currency:</label>
                            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                <option value="RON">RON</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>

                        <div className="summary-tiles-small">
                            <div className="tile-mini income-tile">
                                <span className="label">Income</span>
                                <span className="amount">
                                    {converted.income !== null
                                        ? `+${converted.income.toFixed(2)} ${currency}`
                                        : "Loading..."}
                                </span>
                            </div>
                            <div className="tile-mini expense-tile">
                                <span className="label">Expenses</span>
                                <span className="amount">
                                    {converted.expenses !== null
                                        ? `-${converted.expenses.toFixed(2)} ${currency}`
                                        : "Loading..."}
                                </span>
                            </div>
                            <div className="tile-mini balance-tile">
                                <span className="label">Balance</span>
                                <span className={`amount ${converted.balance >= 0 ? "positive" : "negative"}`}>
                                    {converted.balance !== null
                                        ? `${converted.balance >= 0 ? "+" : "-"}${Math.abs(
                                            converted.balance
                                        ).toFixed(2)} ${currency}`
                                        : "Loading..."}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SummaryTiles;

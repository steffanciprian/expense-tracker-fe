import { useState } from "react";
import { useExpenses } from "./ExpenseContext";
import "../css/SummaryTiles.css";

const SummaryTiles = () => {
    const { expenses } = useExpenses();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currency, setCurrency] = useState("RON");

    // Calculate totals in RON
    const totalExpenses = Array.isArray(expenses)
        ? expenses.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0)
        : 0;

    const totalIncome = Array.isArray(expenses)
        ? expenses.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0)
        : 0;

    const balance = totalIncome - totalExpenses;

    // Simulate conversion to EUR by dividing by 5
    const convertAmount = (amount) => {
        return currency === "RON" ? amount : amount / 5;
    };

    return (
        <>
            <button className="summary-toggle-btn" onClick={() => setIsModalOpen(true)}>
                Show Summary
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                            ✖️
                        </button>

                        <div className="currency-selector">
                            <label>Select Currency:</label>
                            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                <option value="RON">RON</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>

                        <div className="summary-tiles-small">
                            <div className="tile-mini income-tile">
                                <span className="label">Income</span>
                                <span className="amount">
                                    {`+${convertAmount(totalIncome).toFixed(2)} ${currency}`}
                                </span>
                            </div>
                            <div className="tile-mini expense-tile">
                                <span className="label">Expenses</span>
                                <span className="amount">
                                    {`-${convertAmount(totalExpenses).toFixed(2)} ${currency}`}
                                </span>
                            </div>
                            <div className="tile-mini balance-tile">
                                <span className="label">Balance</span>
                                <span
                                    className={`amount ${balance >= 0 ? "positive" : "negative"}`}
                                >
                                    {`${balance >= 0 ? "+" : "-"}${convertAmount(Math.abs(balance)).toFixed(2)} ${currency}`}
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

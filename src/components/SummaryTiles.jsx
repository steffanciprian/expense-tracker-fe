import { useExpenses } from "./ExpenseContext";
import "../css/SummaryTiles.css";

const SummaryTiles = () => {
    const { expenses } = useExpenses();

    if (!Array.isArray(expenses)) return null;

    const totalExpenses = expenses
        .filter((e) => e.type === "expense")
        .reduce((sum, e) => sum + e.amount, 0);

    const totalIncome = expenses
        .filter((e) => e.type === "income")
        .reduce((sum, e) => sum + e.amount, 0);

    const balance = totalIncome - totalExpenses;

    return (
        <div className="summary-tiles-small">
            <div className="tile-mini income-tile">
                <span className="label">Income</span>
                <span className="amount">+{totalIncome.toFixed(2)} RON</span>
            </div>
            <div className="tile-mini expense-tile">
                <span className="label">Expenses</span>
                <span className="amount">-{totalExpenses.toFixed(2)} RON</span>
            </div>
            <div className="tile-mini balance-tile">
                <span className="label">Balance</span>
                <span className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
                    {balance >= 0 ? "+" : "-"}{Math.abs(balance).toFixed(2)} RON
                </span>
            </div>
        </div>
    );
};

export default SummaryTiles;

import {useExpenses} from "./ExpenseContext";
import '../css/SummaryTiles.css';

const SummaryTiles = () => {
    const {expenses} = useExpenses();

    if (!expenses || !Array.isArray(expenses)) {
        return null;
    }

    const totalExpenses = expenses
        .filter(e => e.type === "expense")
        .reduce((sum, e) => sum + e.amount, 0);

    const totalIncome = expenses
        .filter(e => e.type === "income")
        .reduce((sum, e) => sum + e.amount, 0);

    return (

        <div className="summary-tiles">
            <div className="tile income">
                <h4>Total Income</h4>
                <p>+{totalIncome.toFixed(2)} RON</p>
            </div>
            <div className="tile expense">
                <h4>Total Expenses</h4>
                <p>-{totalExpenses.toFixed(2)} RON</p>
            </div>
        </div>

    )
        ;
};

export default SummaryTiles;

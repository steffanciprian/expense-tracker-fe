import { useEffect, useState } from "react";
import { getExpenses, getExpensesCustomRange, deleteExpense } from "../services/expenseService";
import { useExpenses } from "./ExpenseContext";
import EditExpenseModal from "./EditExpenseModal";
import '../css/ExpenseList.css';

const ITEMS_PER_PAGE = 6;

const ExpenseList = () => {
    const { expenses, setExpenses } = useExpenses();
    const [currentPage, setCurrentPage] = useState(1);
    const [editingExpense, setEditingExpense] = useState(null);
    const [timeFilter, setTimeFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = (timeFilter === 'custom' && startDate && endDate)
                    ? await getExpensesCustomRange(startDate, endDate)
                    : await getExpenses(timeFilter);
                setExpenses(data);
            } catch (err) {
                setError('Failed to load expenses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchExpenses();
        setCurrentPage(1);
    }, [timeFilter, startDate, endDate, setExpenses]);

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            setExpenses(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);
    const paginatedExpenses = expenses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="expense-container">
            <div className="filters">
                <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="day">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="custom">Custom Range</option>
                </select>
                {timeFilter === 'custom' && (
                    <>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </>
                )}
            </div>

            {loading && <div className="status">Loading...</div>}
            {error && <div className="status error">{error}</div>}

            {!loading && expenses.length === 0 && (
                <div className="empty">No expenses found.</div>
            )}

            {!loading && expenses.length > 0 && (
                <div className="expense-list">
                    {paginatedExpenses.map(e => (
                        <div key={e.id} className="expense-card">
                            <div className="expense-header">
                                <strong>{e.name}</strong>
                                <span className={`amount ${e.type}`}>{e.type === 'expense' ? '-' : '+'}{e.amount} RON</span>
                            </div>
                            <div className="expense-meta">
                                <span>{e.category}</span>
                                <span>{e.date}</span>
                            </div>
                            <p className="description">{e.description}</p>
                            <div className="expense-actions">
                                <button onClick={() => setEditingExpense(e)}>✏️</button>
                                <button onClick={() => handleDelete(e.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {expenses.length > ITEMS_PER_PAGE && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}

            <EditExpenseModal
                isOpen={!!editingExpense}
                onClose={() => setEditingExpense(null)}
                expense={editingExpense}
            />
        </div>
    );
};

export default ExpenseList;

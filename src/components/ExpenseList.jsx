import { useEffect, useState } from "react";
import { getExpenses, getExpensesCustomRange, deleteExpense } from "../services/expenseService";
import { useExpenses } from "./ExpenseContext";
import EditExpenseModal from "./EditExpenseModal";
import '../css/ExpsenseList.css';

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
        <div className="expense-dashboard">
            <div className="filter-bar">
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

            {loading && <div className="status">🔄 Loading expenses...</div>}
            {error && <div className="status error">❌ {error}</div>}

            {!loading && expenses.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <p>No expenses yet</p>
                    <span>Click <strong>+ Add Expense</strong> to start tracking</span>
                </div>
            )}

            {!loading && expenses.length > 0 && (
                <div className="expense-list-grid">
                    {paginatedExpenses.map(e => (
                        <div key={e.id} className={`expense-card ${e.type}`}>
                            <div className="card-top">
                                <div className="left">
                                    <h4>{e.name}</h4>
                                    <span className="category-tag">{e.category}</span>
                                </div>
                                <div className={`amount ${e.type}`}>
                                    {e.type === 'expense' ? '-' : '+'}{e.amount} RON
                                </div>
                            </div>
                            <div className="card-bottom">
                                <div className="date">{e.date}</div>
                                <div className="desc">{e.description}</div>
                                <div className="actions">
                                    <button onClick={() => setEditingExpense(e)}>✏️</button>
                                    <button onClick={() => handleDelete(e.id)}>🗑️</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {expenses.length > ITEMS_PER_PAGE && (
                <div className="pagination-bar">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>←</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>→</button>
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

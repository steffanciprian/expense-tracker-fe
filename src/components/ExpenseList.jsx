import { useEffect, useState } from "react";
import { getExpenses, getExpensesCustomRange, deleteExpense } from "../services/expenseService";
import { useExpenses } from "./ExpenseContext";
import EditExpenseModal from "./EditExpenseModal";
import '../css/ExpsenseList.css';

const ITEMS_PER_PAGE = 4;

const ExpenseList = () => {
    const { expenses, setExpenses } = useExpenses();
    const [currentPage, setCurrentPage] = useState(1);
    const [editingExpense, setEditingExpense] = useState(null);
    const [timeFilter, setTimeFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch expenses based on filter or custom date range
    useEffect(() => {
        const fetchExpenses = async () => {
            setLoading(true);
            setError(null);
            try {
                let data;
                if (timeFilter === 'custom' && startDate && endDate) {
                    data = await getExpensesCustomRange(startDate, endDate);
                } else {
                    data = await getExpenses(timeFilter);
                }
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
            setExpenses((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);

    const paginatedExpenses = expenses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const renderExpense = (e) => (
        <li
            key={e.id}
            className={`fade-in category-bg-${e.category?.toLowerCase() || 'other'} ${e.type}`}
        >
            <div className="expense-row-top">
                <span className="name">{e.name}</span>
                <span className={`amount ${e.type === 'expense' ? 'negative' : 'positive'}`}>
          {e.type === 'expense' ? '-' : '+'}{e.amount} RON
        </span>
                <span className="date">{e.date}</span>
            </div>
            <div className="expense-row-details">
                {e.category && (
                    <span className={`category category-${e.category.toLowerCase()}`}>
            {e.category}
          </span>
                )}
                {e.description && (
                    <span className="description">"{e.description}"</span>
                )}
            </div>
            <div className="actions">
                <button className="edit-btn" onClick={() => setEditingExpense(e)}>🖉</button>
                <button className="delete-btn" onClick={() => handleDelete(e.id)}>🗑️</button>
            </div>
        </li>
    );

    return (
        <section className="expense-list">
            {loading && <p style={{color: 'white', textAlign: 'center'}}>Loading expenses...</p>}
            {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

            {!loading && expenses.length === 0 && (
                <div className="empty-state">
                    <svg width="160" height="160" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C17.523 22 22 17.523 22 12S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                              stroke="#888" strokeWidth="1.5" />
                        <path d="M8 9h8M8 13h5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p>No expenses recorded yet.</p>
                    <span>Start by clicking <strong>“+ Add Expense”</strong> to track your spending.</span>
                </div>
            )}

            {!loading && expenses.length > 0 && (
                <>
                    <div className="expense-header">
                        <h3 className="section-title">Your Expenses</h3>
                        <div className="filter-options">
                            <label htmlFor="time-filter">Filter:</label>
                            <select
                                id="time-filter"
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="day">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="custom">Custom Range</option>
                            </select>

                            {timeFilter === 'custom' && (
                                <>
                                    <label htmlFor="start-date">Start:</label>
                                    <input
                                        type="date"
                                        id="start-date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        max={endDate || undefined}
                                    />

                                    <label htmlFor="end-date">End:</label>
                                    <input
                                        type="date"
                                        id="end-date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        min={startDate || undefined}
                                        max={new Date().toISOString().split("T")[0]} // max today
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <ul>{paginatedExpenses.map(renderExpense)}</ul>

                    {expenses.length > ITEMS_PER_PAGE && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                ← Prev
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}

            <EditExpenseModal
                isOpen={!!editingExpense}
                onClose={() => setEditingExpense(null)}
                expense={editingExpense}
            />
        </section>
    );
};

export default ExpenseList;

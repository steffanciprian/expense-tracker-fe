import '../css/ExpsenseList.css';
import {useState} from "react";
import {useExpenses} from "./ExpenseContext";

const ExpenseList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {expenses} = useExpenses();
    const itemsPerPage = 4;
    const totalPages = Math.ceil(expenses.length / itemsPerPage);

    const paginatedExpenses = expenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleEdit = (id) => {
        console.log("Edit", id);
    };

    const handleDelete = (id) => {
        console.log("Delete", id);
    };

    return (
        <section className="expense-list">
            {expenses.length === 0 ? (
                <div className="empty-state">
                    <svg width="160" height="160" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C17.523 22 22 17.523 22 12S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                              stroke="#888" strokeWidth="1.5"/>
                        <path d="M8 9h8M8 13h5" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p>No expenses recorded yet.</p>
                    <span>Start by clicking <strong>“+ Add Expense”</strong> to track your spending.</span>
                </div>

            ) : (
                <>
                    <ul>
                        {paginatedExpenses.map((e) => (
                            <li
                                key={e.id}
                                className={`fade-in category-bg-${e.category?.toLowerCase() || 'other'} ${e.type}`}

                            >
                                <div className="expense-row-top">
                                    <span className="name">{e.name}</span>
                                    <span className={`amount ${e.type === 'expense' ? 'negative' : 'positive'}`}>
    {e.type === 'expense' ? '-' : '+'}${e.amount}
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
                                    <button className="edit-btn" onClick={() => handleEdit(e.id)}>🖉</button>
                                    <button className="delete-btn" onClick={() => handleDelete(e.id)}>🗑️</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}>
                                ← Prev
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}>
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default ExpenseList;

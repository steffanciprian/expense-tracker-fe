import '../css/ExpsenseList.css';

const ExpenseList = () => {
    const expenses = [
        { id: 1, name: 'Groceries', amount: -30, date: '2025-05-18' },
        { id: 2, name: 'Salary', amount: 2000, date: '2025-05-17' },
        { id: 3, name: 'Fuel', amount: -50, date: '2025-05-16' },
    ];

    return (
        <section className="expense-list">
            <h3>Recent Transactions</h3>
            <ul>
                {expenses.map((e) => (
                    <li
                        key={e.id}
                        className={`fade-in ${e.amount < 0 ? 'negative' : 'positive'}`}
                    >
                        <span>{e.name}</span>
                        <span>{e.amount < 0 ? '-' : '+'}${Math.abs(e.amount)}</span>
                        <span className="date">{e.date}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ExpenseList;

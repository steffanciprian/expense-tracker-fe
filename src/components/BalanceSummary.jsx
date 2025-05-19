import '../css/BalanceSummary.css';
const BalanceSummary = () => {
    return (
        <section className="balance-summary">
            <h2>Hello, Stefan 👋</h2>
            <p>Balance: <strong>$1,230.00</strong></p>
            <div className="summary-row">
                <span className="income">Income: +$2,000</span>
                <span className="expense">Expenses: -$770</span>
            </div>
        </section>
    );
};

export default BalanceSummary;

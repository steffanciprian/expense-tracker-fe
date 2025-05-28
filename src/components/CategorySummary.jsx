import '../css/CategorySummary.css';
import { useExpenses } from './ExpenseContext';

const CategorySummary = () => {
    const { expenses } = useExpenses();

    const totalsByCategory = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!category) return acc;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    const categories = Object.keys(totalsByCategory);

    return (
        <section className="category-summary">
            <h3 className="category-title">📊 Category Breakdown</h3>
            <ul className="category-list">
                {categories.length === 0 ? (
                    <li>No expenses yet.</li>
                ) : (
                    categories.map((cat) => (
                        <li key={cat}>
                            <span>{getCategoryIcon(cat)} {cat}:</span> RON {totalsByCategory[cat].toFixed(2)}
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
};

// Optional helper to show icons
const getCategoryIcon = (category) => {
    const icons = {
        FOOD: '🍔',
        BILLS: '💡',
        ENTERTAINMENT: '🎮',
        TRAVEL: '✈️',
        HEALTHCARE: '🏥',
        OTHER: '📦',
    };
    return icons[category.toUpperCase()] || '📁';
};

export default CategorySummary;

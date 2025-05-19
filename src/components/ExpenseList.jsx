import '../css/ExpsenseList.css';
import {useEffect, useState} from "react";
import {getExpenses} from "../services/expenseService";

const ExpenseList = () => {

        const [expenses, setExpenses] = useState([]);

        useEffect(() => {
            getExpenses()
                .then(setExpenses)
                .catch(console.error);
        }, []);

        return (
            <section className="expense-list">
                <h3>Recent Transactions</h3>
                {
                    expenses.length === 0 ?
                        (<p> No Expenses found.</p>)
                        :
                        (
                            <ul>
                                {expenses.map((e) => (
                                    <li
                                        key={e.id}
                                        className={`fade-in ${e.cost < 0 ? 'negative' : 'positive'}`}
                                    >
                                        <span>{e.name}</span>
                                        <span>{e.cost < 0 ? '-' : '+'}${Math.abs(e.cost)}</span>
                                        <span className="date">{e.date}</span>
                                    </li>
                                ))}
                            </ul>
                        )
                }

            </section>
        );
    }
;

export default ExpenseList;

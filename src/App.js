import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './css/App.css';
import Header from "./components/Header";
import BalanceSummary from "./components/BalanceSummary";
import ExpenseList from "./components/ExpenseList";
import CategorySummary from "./components/CategorySummary";
import MenuDrawer from "./components/MenuDrawer";
import ChartView from "./components/ChartView";
import ChartToggleButton from "./components/ChartToggleButton";
import AddExpenseModal from './components/AddExpenseModal';
import {ExpenseProvider} from "./components/ExpenseContext";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ExpenseProvider>
        <Router>
            <div className="app-container">
                <MenuDrawer/>
                <Header/>
                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <BalanceSummary onAddExpense={() => setIsModalOpen(true)}/>
                                    <ExpenseList/>
                                    <CategorySummary/>
                                </>
                            }
                        />

                        <Route path="/chart" element={<ChartView/>}/>
                    </Routes>
                </main>

                <div className="fab-container">
                    <ChartToggleButton/>
                </div>
                <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>

            </div>
        </Router>
        </ExpenseProvider>
    );
}

export default App;

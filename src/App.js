import React, { useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import './css/App.css';
import Header from "./components/Header";
import BalanceSummary from "./components/BalanceSummary";
import ExpenseList from "./components/ExpenseList";
import CategorySummary from "./components/CategorySummary";
import MenuDrawer from "./components/MenuDrawer";
import ChartView from "./components/ChartView";
import ChartToggleButton from "./components/ChartToggleButton";
import AddExpenseModal from './components/AddExpenseModal';
import { ExpenseProvider } from "./components/ExpenseContext";

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { AuthProvider, useAuth } from "./components/AuthContext";
import SummaryTiles from "./components/SummaryTiles";

const ProtectedRoute = ({ element }) => {
    const { token } = useAuth();
    return token ? element : <Navigate to="/login" replace />;
};
const ProtectedDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <MenuDrawer />
            <Header />
            <main className="main-content">
                <BalanceSummary onAddExpense={() => setIsModalOpen(true)} />
                <h3 className="section-title">Your Expenses</h3>
                <ExpenseList />
                <SummaryTiles />
            </main>
            <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};


const AppRoutes = () => {
    const { token } = useAuth();

    return (
        <Routes key={token}>
            <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/" replace />} />
            <Route path="/signup" element={!token ? <SignupForm /> : <Navigate to="/" replace />} />
            <Route path="/" element={<ProtectedRoute element={<ProtectedDashboard />} />} />
            <Route path="/chart" element={<ProtectedRoute element={<ChartView />} />} />
            <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
        </Routes>
    );
};

const App = () => (
    <AuthProvider>
        <ExpenseProvider>
            <Router>
                <div className="app-container">
                    <AppRoutes />
                </div>
            </Router>
        </ExpenseProvider>
    </AuthProvider>
);

export default App;

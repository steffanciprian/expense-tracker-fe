import React, {useState} from 'react';

import './css/App.css';
import Header from "./components/Header";
import BalanceSummary from "./components/BalanceSummary";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategorySummary from "./components/CategorySummary";
import MenuDrawer from "./components/MenuDrawer";
import FabButton from "./components/FabButton";
import ChartView from "./components/ChartView";
import ChartToggleButton from "./components/ChartToggleButton";

function App() {
    const [showChart, setShowChart] = useState(false);

    return (
        <div className="app-container">
            <MenuDrawer/>
            <Header/>
            <main className="main-content">
                <BalanceSummary/>
                <ExpenseForm/>
                <ExpenseList/>
                <CategorySummary/>
            </main>
            <div className="fab-container">
                <FabButton onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}/>
                {showChart && <ChartView/>}
                <ChartToggleButton showChart={showChart} onClick={() => setShowChart(!showChart)}/>
            </div>

        </div>
    );
}

export default App;

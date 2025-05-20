import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/ToggleChartButton.css';
import '../css/Tooltip.css';

const ChartToggleButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isOnChartPage = location.pathname === '/chart';

    const handleToggle = () => {
        navigate(isOnChartPage ? '/' : '/chart');
    };

    return (
        <button className="chart-toggle-fab tooltip" onClick={handleToggle}>
            {isOnChartPage ? '⬅️' : '📊'}
            <span className="tooltip-text">
                {isOnChartPage ? 'Back to dashboard' : 'View spending chart'}
            </span>
        </button>
    );
};

export default ChartToggleButton;

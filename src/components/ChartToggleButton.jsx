import React from 'react';
import '../css/ToggleChartButton.css';
import '../css/Tooltip.css';
const ChartToggleButton = ({ showChart, onClick }) => {
    return (
        <button className="chart-toggle-fab tooltip" onClick={onClick}>
            {showChart ? '📉' : '📊'}
            <span className="tooltip-text">Toggle spending chart</span>
        </button>

    );
};

export default ChartToggleButton;

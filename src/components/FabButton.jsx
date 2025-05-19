import React from 'react';
import '../css/FabButton.css';
import '../css/Tooltip.css';

const FabButton = ({ onClick }) => (
    <button className="fab-button tooltip" onClick={onClick}>
        ＋
        <span className="tooltip-text">Scroll to add new expense</span>
    </button>

);

export default FabButton;

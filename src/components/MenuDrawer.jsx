import React, { useState } from 'react';
import '../css/MenuDrawer.css';

const MenuDrawer = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>

            {open && (
                <div className="menu-drawer">
                    <button onClick={() => alert("BNR exchange rates coming soon!")}>BNR Rates</button>
                    <button onClick={() => alert("Spending insights")}>Spending Insights</button>
                    <button onClick={() => alert("Settings")}>Settings</button>
                    <button onClick={() => setOpen(false)}>Close</button>
                </div>
            )}
        </>
    );
};

export default MenuDrawer;

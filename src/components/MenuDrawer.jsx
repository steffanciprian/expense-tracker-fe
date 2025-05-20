import React, { useState, useEffect, useRef } from 'react';
import '../css/MenuDrawer.css';

const MenuDrawer = () => {
    const [open, setOpen] = useState(false);
    const drawerRef = useRef();

    // Close on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Trap focus inside drawer
    useEffect(() => {
        if (!open) return;

        const focusable = drawerRef.current?.querySelectorAll('button');
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];

        const trapFocus = (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first?.focus();
            }
        };

        document.addEventListener('keydown', trapFocus);
        return () => document.removeEventListener('keydown', trapFocus);
    }, [open]);

    return (
        <>
            <button
                className={`hamburger-icon ${open ? 'open' : ''}`}
                aria-label="Toggle menu"
                onClick={() => setOpen(!open)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>


            {open && (
                <>
                    <div
                        className="menu-overlay"
                        role="presentation"
                        onClick={() => setOpen(false)}
                    />

                    <nav
                        className="menu-drawer slide-in"
                        role="dialog"
                        aria-modal="true"
                        ref={drawerRef}
                    >
                        <button onClick={() => alert("BNR exchange rates coming soon!")}>BNR Rates</button>
                        <button onClick={() => alert("Spending insights")}>Spending Insights</button>
                        <button onClick={() => alert("Settings")}>Settings</button>
                        <button onClick={() => setOpen(false)}>Close</button>
                    </nav>
                </>
            )}
        </>
    );
};

export default MenuDrawer;

import '../css/Header.css';
import '../css/common.css';

const Header = () => {
    return (
        <header className="app-header">
            <h1 className="header-title">💸 Expense Tracker</h1>
            <button className="btn btn-danger" onClick={() => {
                localStorage.removeItem("jwtToken");
                window.location.href = '/login';
            }}>
                Logout
            </button>

        </header>
    );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">StockSage</div>
            <nav>
                <Link to="/notifications" className="icon-button">
                    <i className="fas fa-bell"></i>
                </Link>
                <div className="profile-dropdown">
                    <button className="icon-button">
                        <i className="fas fa-user-circle"></i>
                    </button>
                    <div className="dropdown-content">
                        <Link to="/profile">Profile</Link>
                        <Link to="/">Logout</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
    const [stocks, setStocks] = useState([
        { symbol: 'AAPL', price: 150.25, change: 2.5 },
        { symbol: 'GOOGL', price: 2750.80, change: -1.2 },
        { symbol: 'MSFT', price: 305.60, change: 0.8 },
    ]);
    const [newStock, setNewStock] = useState('');
    const navigate = useNavigate();

    const handleAddStock = () => {
        if (newStock && !stocks.find(stock => stock.symbol === newStock)) {
            const randomPrice = (Math.random() * 1000).toFixed(2);
            const randomChange = (Math.random() * 10 - 5).toFixed(2);
            setStocks([...stocks, { symbol: newStock, price: parseFloat(randomPrice), change: parseFloat(randomChange) }]);
            setNewStock('');
        }
    };

    const handleRemoveStock = (symbolToRemove) => {
        setStocks(stocks.filter(stock => stock.symbol !== symbolToRemove));
    };

    const goToNotifications = () => {
        navigate('/notifications');
    };

    return (
        <div className="main-container">
            <div className="dashboard">
                <h1>Stock Dashboard</h1>
                <p>Manage your stock portfolio</p>

                <div className="add-stock-section">
                    <h2>Add New Stock</h2>
                    <div className="add-stock-form">
                        <input
                            type="text"
                            value={newStock}
                            onChange={(e) => setNewStock(e.target.value.toUpperCase())}
                            placeholder="Enter stock symbol"
                            className="stock-input"
                        />
                        <button onClick={handleAddStock} className="add-stock-button">
                            Add Stock
                        </button>
                    </div>
                </div>

                <div className="stocks-container">
                    <div className="stocks-grid">
                        {stocks.map((stock) => (
                            <div key={stock.symbol} className="stock-card">
                                <div>
                                    <h3>{stock.symbol}</h3>
                                    <p className="stock-price">${stock.price.toFixed(2)}</p>
                                    <p className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                                        {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change)}%
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleRemoveStock(stock.symbol)}
                                    className="remove-stock-button"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={goToNotifications} className="manage-notifications-button">
                    Manage Notifications
                </button>
            </div>
        </div>
    );
};

export default MainPage;
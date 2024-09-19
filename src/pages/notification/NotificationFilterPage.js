import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './NotificationFilterPage.css';

const NotificationFilterPage = () => {
    const [notifications, setNotifications] = useState({
        keyUpdates: true,
        analyticalUpdates: true,
        eventSchedules: true,
        technicalIdeas: true,
        mediaCoverage: true,
        priceVolumeMovements: true,
        aiChartWizard: true,
        nonClassified: true,
    });

    const navigate = useNavigate(); // Initialize the navigate function

    const handleToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const goBackToDashboard = () => {
        navigate('/main');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #1a237e, #4a148c)',
            color: 'white',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <button
                    onClick={goBackToDashboard}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        marginBottom: '2rem'
                    }}
                >
                ← Back to Dashboard
                </button>
                <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>Notification Preferences</h1>
                <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem', color: '#e0e0e0' }}>
                    Customize your stock updates
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span>{value ? 'Enabled' : 'Disabled'}</span>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => handleToggle(key)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <button style={{
                                width: '100%',
                                padding: '0.5rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: 'none',
                                borderRadius: '5px',
                                color: 'white',
                                cursor: 'pointer'
                            }}>
                                View Sample
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationFilterPage;
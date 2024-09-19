import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Load the Google SDK
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: 'YOUR_GOOGLE_CLIENT_ID',
                });
            });
        };

        // Load the Facebook SDK
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: 'YOUR_FACEBOOK_APP_ID',
                cookie: true,
                xfbml: true,
                version: 'v11.0'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the login logic
        console.log('Login submitted', { name, email, mobileNumber });
        navigate('/main');
    };

    const handleGoogleLogin = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(
            (googleUser) => {
                const profile = googleUser.getBasicProfile();
                console.log('Google login successful', profile);
                // Handle the successful login (e.g., send data to your server, update state, etc.)
                navigate('/main');
            },
            (error) => {
                console.error('Google login failed', error);
            }
        );
    };

    const handleFacebookLogin = () => {
        window.FB.login((response) => {
            if (response.authResponse) {
                console.log('Facebook login successful', response);
                // Handle the successful login (e.g., send data to your server, update state, etc.)
                navigate('/main');
            } else {
                console.log('Facebook login failed');
            }
        }, {scope: 'public_profile,email'});
    };

    useEffect(() => {
        // Load the Google SDK
        const loadGoogleSDK = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://apis.google.com/js/platform.js';
                script.async = true;
                script.defer = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        // Load the Facebook SDK
        const loadFacebookSDK = () => {
            return new Promise((resolve) => {
                window.fbAsyncInit = function() {
                    window.FB.init({
                        appId: 'YOUR_FACEBOOK_APP_ID',
                        cookie: true,
                        xfbml: true,
                        version: 'v11.0'
                    });
                    resolve();
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "https://connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            });
        };

        const initializeSDKs = async () => {
            try {
                await loadGoogleSDK();
                console.log('Google SDK loaded successfully');
                window.gapi.load('auth2', () => {
                    window.gapi.auth2.init({
                        client_id: 'YOUR_GOOGLE_CLIENT_ID',
                    }).then(() => {
                        console.log('Google Auth initialized successfully');
                    }).catch((error) => {
                        console.error('Google Auth initialization failed', error);
                    });
                });

                await loadFacebookSDK();
                console.log('Facebook SDK loaded successfully');
            } catch (error) {
                console.error('Error loading SDKs:', error);
            }
        };

        initializeSDKs();
    }, []);

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login to StockSage</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber">WhatsApp Number</label>
                        <input
                            id="mobileNumber"
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="social-login">
                    <button onClick={handleGoogleLogin} className="google-login">
                        Login with Google
                    </button>
                    <button onClick={handleFacebookLogin} className="facebook-login">
                        Login with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LoginForm = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const res = await axios.post('http://localhost:8080/auth/login', {
            const res = await axios.post('https://expense-tracker-y9kx.onrender.com/auth/login', {
                username:username.trim(),
                password:password.trim(),
            });
            const jwt = res.data;
            login(jwt);
            navigate('/');
        } catch (err) {
            console.error('Login failed:', err);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <h2>Welcome Back 👋</h2>
                <p className="auth-message">Log in to track your expenses and take control of your finances.</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p className="auth-footer">
                    Don’t have an account? <a href="/signup">Sign up</a>
                </p>
            </form>
        </div>
    );

};

export default LoginForm;

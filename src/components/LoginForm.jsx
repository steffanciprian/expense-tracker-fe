import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AuthForm.css';
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
            const res = await axios.post('http://13.51.196.71:8080/auth/login', {
                username,
                password,
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
        <div className="auth-container-glass">
            <form onSubmit={handleLogin} autoComplete="off" className="auth-box-glass">
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to track your expenses</p>
                <input
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />
                <button type="submit" className="login-btn">Login</button>
                <p className="auth-footer">
                    Don’t have an account? <a href="/signup">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;

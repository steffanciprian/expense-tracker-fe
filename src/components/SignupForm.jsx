import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AuthForm.css';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setUsername('');
        setPassword('');
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://expense-tracker-y9kx.onrender.com/auth/register', { username, password });
            alert('✅ Account created! You can now log in.');
            navigate('/login');
        } catch (err) {
            alert('❌ Registration failed. Try a different username.');
        }
    };

    return (
        <div className="auth-container-glass">
            <form onSubmit={handleSignup} autoComplete="off" className="auth-box-glass">
                <h2>Sign Up</h2>
                <p className="subtitle">Create your free account</p>
                <input
                    type="text"
                    name="username"
                    placeholder="Choose a Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Choose a Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />
                <button type="submit" className="login-btn">Sign Up</button>
                <p className="auth-footer">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;

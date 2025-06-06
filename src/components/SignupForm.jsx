import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginForm.css'; // reuse same minimal CSS

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert('Email and password are required.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            await axios.post('https://expense-tracker-y9kx.onrender.com/auth/register', {
                username: email, // still sent as 'username' to backend
                password,
            });
            alert('✅ Account created! You can now log in.');
            navigate('/login');
        } catch (err) {
            alert('❌ Registration failed. Try a different email.');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSignup} className="auth-form">
                <h2>Sign Up</h2>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Choose a Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
                <p className="auth-footer">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;

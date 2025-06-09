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
            const res = await axios.post('http://localhost:8080/auth/login', {
            // const res = await axios.post('https://expense-tracker-y9kx.onrender.com/auth/login', {
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
                <h2>Login</h2>
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

            {/*<button*/}
            {/*    type="button"*/}
            {/*    onClick={() => {*/}
            {/*        const dummyToken = 'test-jwt-token';*/}
            {/*        login(dummyToken);*/}
            {/*        localStorage.setItem('jwtToken', dummyToken); // optional: persist it*/}
            {/*        navigate('/');*/}
            {/*    }}*/}
            {/*    style={{ marginTop: '1rem', backgroundColor: '#ccc', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}*/}
            {/*>*/}
            {/*    🔓 Bypass Login*/}
            {/*</button>*/}

        </div>
    );
};

export default LoginForm;

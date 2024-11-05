import { useState } from 'react';
import axios from 'axios';
import './styles/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.token); 
        } catch (error) {
            setMessage(`Login failed: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="form-control mb-3"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="form-control mb-3"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {message && <p className="login-message">{message}</p>}
            </form>
        </div>
    );
};

export default Login;

import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMessage(response.data.message);
        } catch (error) {
            
            setMessage(`Registration failed: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <div className="form-group">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="form-control mb-3"
                    required
                />
            </div>
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
            <button type="submit" className="btn btn-primary">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;

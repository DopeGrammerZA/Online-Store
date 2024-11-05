import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setLoading(true); 

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMessage(response.data.message);
        } catch (error) {
            setIsError(true);
            setMessage(`Registration failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false); 
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
                    type={showPassword ? 'text' : 'password'} 
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="form-control mb-3"
                    required
                />
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Hide' : 'Show'} Password
                </button>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'} 
            </button>
            {message && (
                <p className={isError ? 'text-danger' : 'text-success'}>{message}</p>
            )}
        </form>
    );
};

export default Register;

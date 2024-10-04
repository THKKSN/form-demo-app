import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import "../styles/css/loginPage/Login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:3001/login', credentials);
            const { token, _id: userId } = response.data; 
    

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId); 
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await handleLogin({ username, password });
            
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert('Wrong!!! Username or Password');
        }
    };

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        required 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder="Password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span 
                            className="toggle-password" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

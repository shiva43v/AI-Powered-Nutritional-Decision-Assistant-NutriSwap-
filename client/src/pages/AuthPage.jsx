import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Target } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import axios from 'axios';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    goal: 'Maintenance'
  });
  const [localError, setLocalError] = useState('');
  
  const navigate = useNavigate();
  const { setAuth, setLoading, isLoading } = useAuthStore();

  const API_URL = 'http://localhost:5000/api/auth';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };
        
      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      
      // If registering, also update goal immediately
      if (!isLogin && formData.goal !== 'Maintenance') {
         await axios.put(`${API_URL}/profile`, {
           profile: { goal: formData.goal }
         }, {
           headers: { Authorization: `Bearer ${response.data.token}` }
         });
         response.data.profile.goal = formData.goal;
      }
      
      setAuth(response.data, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setLocalError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card auth-card"
      >
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to access your nutritional strategist' : 'Join NutriSwap to start negotiating your meals'}</p>
        </div>

        {localError && <div className="auth-error">{localError}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User size={20} className="input-icon" />
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                className="input-field with-icon"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              className="input-field with-icon"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className="input-field with-icon"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <Target size={20} className="input-icon" />
              <select 
                name="goal" 
                className="input-field with-icon"
                value={formData.goal}
                onChange={handleChange}
              >
                <option value="Maintenance">Maintenance (Default)</option>
                <option value="Sugar Detox">Sugar Detox</option>
                <option value="Lean Bulk">Lean Bulk</option>
                <option value="Fat Cut">Fat Cut</option>
                <option value="Heart Health">Heart Health</option>
                <option value="Gut Reset">Gut Reset</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthModal = ({ show, mode: initialMode, onClose, showToast }) => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const username = formData.get('username');

    try {
      if (mode === 'login') {
        await login(email, password);
        showToast('Welcome back!');
      } else {
        await signup(username, email, password);
        showToast('Account created!');
      }
      onClose();
    } catch (error) {
      showToast(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        
        <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p>
          {mode === 'login' 
            ? 'Log in to your account' 
            : 'Sign up to start commenting'}
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div>
              <label>Username</label>
              <input type="text" name="username" required minLength="3" />
            </div>
          )}
          
          <div>
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          
          <div>
            <label>Password</label>
            <input type="password" name="password" required minLength="6" />
          </div>
          
          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: '100%', marginTop: 8 }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="modal-switch">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
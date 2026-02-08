import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = ({ onNavigate, onShowAuth }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="blog-nav">
      <div 
        className="blog-nav__logo" 
        onClick={() => onNavigate('home')}
      >
        The<span>Ink</span>
      </div>
      
      <div className="blog-nav__actions">
        {user ? (
          <>
            <div className="blog-nav__user">
              Welcome, <strong>{user.username}</strong>
            </div>
            
            {isAdmin && (
              <>
                <button 
                  className="btn btn--ghost" 
                  onClick={() => onNavigate('manage')}
                >
                  My Articles
                </button>
                <button 
                  className="btn btn--primary btn--sm" 
                  onClick={() => onNavigate('editor')}
                >
                  + New Article
                </button>
              </>
            )}
            
            <button 
              className="btn btn--outline btn--sm" 
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              className="btn btn--ghost" 
              onClick={() => onShowAuth('login')}
            >
              Login
            </button>
            <button 
              className="btn btn--primary btn--sm" 
              onClick={() => onShowAuth('signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
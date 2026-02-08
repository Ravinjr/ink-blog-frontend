import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import components
import Navigation from './components/Navigation';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

// Import pages
import HomePage from './pages/HomePage';
import ArticleView from './pages/ArticleView';
import EditorView from './pages/EditorView';
import ManageView from './pages/ManageView';

// Import styles
import './styles.css';
import { useToast } from './hooks/UseToast';
import { articlesAPI } from './services/Api';

/**
 * Main App Content Component
 * Handles routing and view state management
 */
const AppContent = () => {
  const { isAdmin } = useAuth();
  const { toast, showToast } = useToast();

  // View state management
  const [view, setView] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);

  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  /**
   * Central navigation handler
   * Routes between different views in the app
   */
  const handleNavigate = (destination, data = null) => {
    switch (destination) {
      case 'home':
        setView('home');
        setSelectedArticle(null);
        setEditingArticle(null);
        break;
        
      case 'article':
        setView('article');
        setSelectedArticle(data);
        break;
        
      case 'editor':
        if (!isAdmin) {
          showToast('Only admin can create articles');
          return;
        }
        setView('editor');
        setEditingArticle(data || null);
        break;
        
      case 'manage':
        if (!isAdmin) {
          showToast('Access denied');
          return;
        }
        setView('manage');
        break;
        
      default:
        setView('home');
    }
  };

  /**
   * Delete article handler
   * Confirms before deletion and shows feedback
   */
  const handleDeleteArticle = async (articleId) => {
    if (!window.confirm('Delete this article?')) return;

    try {
      await articlesAPI.delete(articleId);
      showToast('Article deleted');
      handleNavigate('home');
    } catch (error) {
      showToast('Failed to delete article');
    }
  };

  /**
   * Show authentication modal
   */
  const handleShowAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  /**
   * Close authentication modal
   */
  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  // Main JSX render
  return (
    <div className="blog-root">
      {/* Navigation bar - always visible */}
      <Navigation 
        onNavigate={handleNavigate} 
        onShowAuth={handleShowAuth} 
      />

      {/* Home Page - Article grid */}
      {view === 'home' && (
        <HomePage 
          onViewArticle={(article) => handleNavigate('article', article)} 
        />
      )}

      {/* Article View - Single article with comments */}
      {view === 'article' && selectedArticle && (
        <ArticleView
          article={selectedArticle}
          onBack={() => handleNavigate('home')}
          onEdit={(article) => handleNavigate('editor', article)}
          onDelete={handleDeleteArticle}
          onShowAuth={handleShowAuth}
          showToast={showToast}
        />
      )}

      {/* Editor - Create/edit articles (admin only) */}
      {view === 'editor' && (
        <EditorView
          article={editingArticle}
          onBack={() => handleNavigate('home')}
          showToast={showToast}
        />
      )}

      {/* Manage - Article management dashboard (admin only) */}
      {view === 'manage' && (
        <ManageView
          onViewArticle={(article) => handleNavigate('article', article)}
          onEditArticle={(article) => handleNavigate('editor', article)}
          onDeleteArticle={handleDeleteArticle}
        />
      )}

      {/* Authentication Modal - Login/Signup */}
      <AuthModal
        show={showAuthModal}
        mode={authMode}
        onClose={handleCloseAuth}
        showToast={showToast}
      />

      {/* Toast Notifications */}
      <Toast message={toast} show={!!toast} />
    </div>
  );
};

/**
 * Root App Component
 * Wraps the app with AuthProvider for global authentication state
 */
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
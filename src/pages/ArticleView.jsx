import React from 'react';
import { formatDate } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from '../components/CommentSection';

const ArticleView = ({ article, onBack, onEdit, onDelete, onShowAuth, showToast }) => {
  const { isAdmin } = useAuth();

  return (
    <div className="article-view">
      <button className="article-view__back" onClick={onBack}>
        ← Back to Articles
      </button>
      
      <div className="article-view__header">
        <div className="article-view__cat">{article.category}</div>
        <h1>{article.title}</h1>
        <div className="article-view__byline">
          <span>By {article.author?.username || 'Unknown'}</span>
          <span>·</span>
          <span>{formatDate(article.createdAt)}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>
      
      <div className="article-view__divider" />
      
      <div className="article-view__body">
        {article.body}
      </div>

      {isAdmin && (
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid #eae6e1',
            display: 'flex',
            gap: 10,
          }}
        >
          <button 
            className="btn btn--outline btn--sm" 
            onClick={() => onEdit(article)}
          >
            Edit
          </button>
          <button 
            className="btn btn--danger btn--sm" 
            onClick={() => onDelete(article._id)}
          >
            Delete
          </button>
        </div>
      )}

      <CommentSection
        articleId={article._id}
        onShowAuth={onShowAuth}
        showToast={showToast}
      />
    </div>
  );
};

export default ArticleView;
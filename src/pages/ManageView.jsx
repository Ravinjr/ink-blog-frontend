import React, { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api';
import { formatDate } from '../utils/helpers';

const ManageView = ({ onViewArticle, onEditArticle, onDeleteArticle }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data } = await articlesAPI.getAllAdmin();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading your articles...
      </div>
    );
  }

  return (
    <div className="manage-view">
      <h2>My Articles</h2>
      <p>Write, edit, publish or delete your articles here.</p>
      
      <div className="manage-list">
        {articles.length === 0 ? (
          <div className="empty-state">
            <h3>No articles yet</h3>
            <p>Click "+ New Article" to get started.</p>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article._id} className="manage-item">
              <div className="manage-item__left">
                <h4>{article.title}</h4>
                <div className="manage-item__meta">
                  {article.category} · {formatDate(article.createdAt)} · {article.readTime}
                  {article.status === 'draft' && (
                    <span className="blog-card__draft-badge">Draft</span>
                  )}
                </div>
              </div>
              
              <div className="manage-item__actions">
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={() => onViewArticle(article)}
                >
                  View
                </button>
                <button
                  className="btn btn--outline btn--sm"
                  onClick={() => onEditArticle(article)}
                >
                  Edit
                </button>
                <button
                  className="btn btn--danger btn--sm"
                  onClick={() => onDeleteArticle(article._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageView;
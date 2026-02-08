import React from 'react';
import { formatDate } from '../utils/helpers';

const ArticleCard = ({ article, onClick }) => {
  return (
    <article className="blog-card" onClick={onClick}>
      <div className={`blog-card__color-bar cat-color-${article.category}`} />
      
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="blog-card__cat">{article.category}</span>
          <span className="blog-card__dot" />
          <span className="blog-card__readtime">{article.readTime}</span>
          {article.status === 'draft' && (
            <span className="blog-card__draft-badge">Draft</span>
          )}
        </div>
        
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        
        <div className="blog-card__footer">
          {formatDate(article.createdAt)}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
import React, { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';

const HomePage = ({ onViewArticle }) => {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState([]);
  const [filterCat, setFilterCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, [isAdmin]);

  const loadArticles = async () => {
    try {
      const endpoint = isAdmin ? articlesAPI.getAllAdmin : articlesAPI.getAll;
      const { data } = await endpoint();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) =>
    filterCat === 'All' ? true : article.category === filterCat
  );

  if (loading) {
    return (
      <div className="loading">
        Loading articles...
      </div>
    );
  }

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero__tag">Welcome to TheInk</div>
        <h1>
          Stories worth <em>reading</em>, ideas worth sharing
        </h1>
        <p>
          A personal blog for thoughts on technology, lifestyle, and everything in between.
        </p>
      </section>

      <CategoryFilter 
        selectedCategory={filterCat} 
        onSelectCategory={setFilterCat} 
      />

      <div className="blog-grid">
        {filteredArticles.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <h3>No articles here yet</h3>
            <p>Check back soon for new content!</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              onClick={() => onViewArticle(article)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default HomePage;
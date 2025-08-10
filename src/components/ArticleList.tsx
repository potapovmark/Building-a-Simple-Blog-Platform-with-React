import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articlesApi } from '../services/api';
import { Article } from '../types';
import './ArticleList.css';

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await articlesApi.getArticles(page, 10);
      setArticles(response.articles);
      setTotalPages(Math.ceil(response.articlesCount / 10));
    } catch (err) {
      setError('Ошибка при загрузке статей');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading && articles.length === 0) {
    return <div className="loading">Загрузка статей...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="article-list">
      {articles.map((article) => (
        <article key={article.slug} className="article-card">
          <div className="article-header">
            <div className="article-meta">
              <div className="author-info">
                <div className="author-avatar">
                  <img
                    src={article.author.image || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiNlMWUxZTEiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjM1IiByPSIxNSIgZmlsbD0iIzk5OSIvPjwvc3ZnPg=="}
                    alt={article.author.username}
                  />
                </div>
                <div className="author-details">
                  <span className="author-name">{article.author.username}</span>
                  <span className="article-date">
                    {formatDate(article.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="like-button">
              <span className="heart">♥</span>
              <span className="likes-count">{article.favoritesCount}</span>
            </div>
          </div>

          <Link to={`/articles/${article.slug}`} className="article-title">
            <h2>{article.title}</h2>
          </Link>

          <p className="article-description">{article.description}</p>

          <div className="article-tags">
            {article.tagList.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`page-button ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;

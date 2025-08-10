import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { articlesApi } from '../services/api';
import { Article } from '../types';
import './ArticleDetail.css';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await articlesApi.getArticle(articleSlug);
      setArticle(response.article);
    } catch (err) {
      setError('Ошибка при загрузке статьи');
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

  if (loading) {
    return <div className="loading">Загрузка статьи...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!article) {
    return <div className="error">Статья не найдена</div>;
  }

  return (
    <div className="article-detail">
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

      <h1 className="article-title">{article.title}</h1>

      <p className="article-description">{article.description}</p>

      <div className="article-tags">
        {article.tagList.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="article-body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>

      <div className="back-link">
        <Link to="/">← Назад к списку статей</Link>
      </div>
    </div>
  );
};

export default ArticleDetail;

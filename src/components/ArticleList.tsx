import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { articlesApi } from "../services/api";
import { Article } from "../types";
import { useAuth } from "../contexts/AuthContext";
import "./ArticleList.css";

const ArticleList: React.FC = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favoritingSlugs, setFavoritingSlugs] = useState<Set<string>>(
    new Set(),
  );

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
      setError("Error loading articles");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (article: Article) => {
    if (!user) return;

    try {
      setFavoritingSlugs((prev) => new Set(prev).add(article.slug));

      let response: any;
      if (article.favorited) {
        response = await articlesApi.unfavoriteArticle(article.slug);
      } else {
        response = await articlesApi.favoriteArticle(article.slug);
      }

      setArticles((prevArticles) =>
        prevArticles.map((prevArticle) =>
          prevArticle.slug === article.slug ? response.article : prevArticle,
        ),
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error updating favorite status:", err);
    } finally {
      setFavoritingSlugs((prev) => {
        const newSet = new Set(prev);
        newSet.delete(article.slug);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading && articles.length === 0) {
    return <div className="loading">⏳ Loading articles...</div>;
  }

  if (error) {
    return <div className="error">⚠ {error}</div>;
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
                    src={
                      article.author.image ||
                      process.env.PUBLIC_URL + "/default-avatar.svg"
                    }
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
            <button
              className={`like-button ${article.favorited ? "favorited" : ""}`}
              onClick={() => handleFavorite(article)}
              disabled={favoritingSlugs.has(article.slug) || !user}
            >
              <span className="heart">{article.favorited ? "❤️" : "♡"}</span>
              <span className="likes-count">{article.favoritesCount}</span>
            </button>
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
            className={`page-button ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;

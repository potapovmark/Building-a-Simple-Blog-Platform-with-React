import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { articlesApi } from "../services/api";
import { Article } from "../types";
import { useAuth } from "../contexts/AuthContext";
import "./ArticleDetail.css";

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);
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
      setError("Error loading article");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleFavorite = async () => {
    if (!user || !article || !slug) return;

    try {
      setIsFavoriting(true);
      let response;

      if (article.favorited) {
        response = await articlesApi.unfavoriteArticle(slug);
      } else {
        response = await articlesApi.favoriteArticle(slug);
      }

      setArticle(response.article);
    } catch (err) {
      setError("Error updating favorite status");
    } finally {
      setIsFavoriting(false);
    }
  };

  const handleDelete = async () => {
    if (!article || !slug) return;

    try {
      setIsDeleting(true);
      await articlesApi.deleteArticle(slug);
      navigate("/");
    } catch (err) {
      setError("Error deleting article");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return <div className="loading">⏳ Loading article...</div>;
  }

  if (error) {
    return <div className="error">⚠ {error}</div>;
  }

  if (!article) {
    return <div className="error">⚠ Article not found</div>;
  }

  return (
    <div className="article-detail">
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = process.env.PUBLIC_URL + "/default-avatar.svg";
                }}
              />
            </div>
            <div className="author-details">
              <Link
                to={`/profiles/${article.author.username}`}
                className="author-name"
              >
                {article.author.username}
              </Link>
              <span className="article-date">
                {formatDate(article.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <button
          className={`like-button ${article.favorited ? "favorited" : ""}`}
          onClick={handleFavorite}
          disabled={isFavoriting || !user}
        >
          <span className="heart">{article.favorited ? "❤️" : "♡"}</span>
          <span className="likes-count">{article.favoritesCount}</span>
        </button>
      </div>

      <h1 className="article-title">{article.title}</h1>

      {user && user.username === article.author.username && (
        <div className="article-actions">
          <Link to={`/articles/${slug}/edit`} className="edit-button">
            ✏️ Edit Article
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="delete-button"
          >
            🗑️ Delete Article
          </button>
        </div>
      )}

      <p className="article-description">{article.description}</p>

      {article.tagList &&
        article.tagList.length > 0 &&
        article.tagList.some((tag) => tag && tag.trim() !== "") && (
          <div className="article-tags">
            {article.tagList
              .filter((tag) => tag && tag.trim() !== "")
              .map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
          </div>
        )}

      <div className="article-body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>

      <div className="back-link">
        <Link to="/">← Back to articles</Link>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Article</h3>
            <p>Are you sure you want to delete "{article.title}"?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="cancel-button"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="delete-confirm-button"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;

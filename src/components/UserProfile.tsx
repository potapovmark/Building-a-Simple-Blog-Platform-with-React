import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { articlesApi } from "../services/api";
import { ProfileResponse, ArticlesResponse } from "../types";
import { useAuth } from "../contexts/AuthContext";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [articles, setArticles] = useState<ArticlesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Сначала пытаемся получить статьи пользователя
      let articlesData;
      try {
        articlesData = await articlesApi.getArticlesByAuthor(
          username!,
          currentPage,
          10,
        );
        setArticles(articlesData);
      } catch (articlesErr: any) {
        // eslint-disable-next-line no-console
        console.warn("Could not load articles:", articlesErr);
        setArticles(null);
      }

      // Создаем профиль на основе данных из статей
      if (articlesData && articlesData.articles.length > 0) {
        const firstArticle = articlesData.articles[0];
        const fallbackProfile: ProfileResponse = {
          profile: {
            username: username!,
            bio: firstArticle.author.bio,
            image: firstArticle.author.image,
            following: firstArticle.author.following,
          },
        };
        setProfile(fallbackProfile);
        setIsFollowing(firstArticle.author.following);
      } else {
        // Если нет статей, создаем минимальный профиль
        const fallbackProfile: ProfileResponse = {
          profile: {
            username: username!,
            bio: null,
            image: null,
            following: false,
          },
        };
        setProfile(fallbackProfile);
        setIsFollowing(false);
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [username, currentPage]);

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username, currentPage, fetchUserData]);

  const handleFollow = async () => {
    // Здесь можно добавить логику для подписки/отписки
    setIsFollowing(!isFollowing);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="loading">⏳ Loading profile...</div>;
  }

  if (error || !profile) {
    return <div className="error">⚠ {error || "Profile not found"}</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src={
              profile.profile.image ||
              process.env.PUBLIC_URL + "/default-avatar.svg"
            }
            alt={profile.profile.username}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = process.env.PUBLIC_URL + "/default-avatar.svg";
            }}
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-username">{profile.profile.username}</h1>
          {profile.profile.bio && (
            <p className="profile-bio">{profile.profile.bio}</p>
          )}
          <div className="profile-actions">
            {user && user.username !== profile.profile.username && (
              <button
                className={`follow-button ${isFollowing ? "following" : ""}`}
                onClick={handleFollow}
              >
                {isFollowing ? "✓ Following" : "+ Follow"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-number">{articles?.articlesCount || 0}</span>
          <span className="stat-label">Articles</span>
        </div>
        {/* Можно добавить другие статистики */}
      </div>

      <div className="profile-articles">
        <h2>Articles by {profile.profile.username}</h2>

        {articles && articles.articles.length > 0 ? (
          <div className="articles-list">
            {articles.articles.map((article) => (
              <article key={article.slug} className="article-item">
                <div className="article-header">
                  <div className="article-meta">
                    <span className="article-date">
                      {formatDate(article.createdAt)}
                    </span>
                    <span className="article-likes">
                      ♡ {article.favoritesCount}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/articles/${article.slug}`}
                  className="article-title"
                >
                  <h3>{article.title}</h3>
                </Link>

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
              </article>
            ))}
          </div>
        ) : (
          <p className="no-articles">No articles yet.</p>
        )}

        {/* Пагинация */}
        {articles && articles.articlesCount > 10 && (
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(articles.articlesCount / 10) },
              (_, i) => i + 1,
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`page-button ${currentPage === page ? "active" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="back-link">
        <Link to="/">← Back to articles</Link>
        <button 
          onClick={fetchUserData} 
          className="retry-button"
          style={{ marginLeft: '20px', padding: '8px 16px', background: '#5cb85c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          🔄 Retry
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

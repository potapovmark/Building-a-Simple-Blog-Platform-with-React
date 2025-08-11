export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string | null;
    image: string | null;
    following: boolean;
  };
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface SingleArticleResponse {
  article: Article;
}

// Authentication types
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  email?: string;
  username?: string;
  bio?: string | null;
  image?: string | null;
  password?: string;
}

export interface AuthResponse {
  user: User;
}

export interface ProfileResponse {
  profile: {
    username: string;
    bio: string | null;
    image: string | null;
    following: boolean;
  };
}

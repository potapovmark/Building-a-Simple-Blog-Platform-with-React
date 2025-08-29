/* eslint-disable no-console */
import axios from "axios";
import {
  ArticlesResponse,
  SingleArticleResponse,
  LoginRequest,
  RegistrationRequest,
  UpdateProfileRequest,
  AuthResponse,
  ProfileResponse,
  CreateArticleRequest,
  UpdateArticleRequest,
  CreateArticleResponse,
  UpdateArticleResponse,
} from "../types";

const API_BASE_URL = "https://realworld.habsida.net/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const articlesApi = {
  getArticles: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<ArticlesResponse> => {
    const response = await api.get(
      `/articles?limit=${limit}&offset=${(page - 1) * limit}`,
    );
    return response.data;
  },

  getArticle: async (slug: string): Promise<SingleArticleResponse> => {
    const response = await api.get(`/articles/${slug}`);
    return response.data;
  },

  createArticle: async (
    articleData: CreateArticleRequest,
  ): Promise<CreateArticleResponse> => {
    console.log("API: Creating article with data:", articleData);
    try {
      const response = await api.post("/articles", { article: articleData });
      console.log("API: Article created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("API: Error creating article:", error);
      throw error;
    }
  },

  updateArticle: async (
    slug: string,
    articleData: UpdateArticleRequest,
  ): Promise<UpdateArticleResponse> => {
    console.log("API: Updating article", slug, "with data:", articleData);
    try {
      const response = await api.put(`/articles/${slug}`, {
        article: articleData,
      });
      console.log("API: Article updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("API: Error updating article:", error);
      throw error;
    }
  },

  deleteArticle: async (slug: string): Promise<void> => {
    await api.delete(`/articles/${slug}`);
  },

  favoriteArticle: async (slug: string): Promise<SingleArticleResponse> => {
    console.log("API: Favoriting article:", slug);
    try {
      const response = await api.post(`/articles/${slug}/favorite`);
      console.log("API: Article favorited successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("API: Error favoriting article:", error);
      throw error;
    }
  },

  unfavoriteArticle: async (slug: string): Promise<SingleArticleResponse> => {
    console.log("API: Unfavoriting article:", slug);
    try {
      const response = await api.delete(`/articles/${slug}/favorite`);
      console.log("API: Article unfavorited successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("API: Error unfavoriting article:", error);
      throw error;
    }
  },
};

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post("/users/login", { user: credentials });
    return response.data;
  },

  register: async (userData: RegistrationRequest): Promise<AuthResponse> => {
    const response = await api.post("/users", { user: userData });
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await api.get("/user");
    return response.data;
  },

  updateProfile: async (
    userData: UpdateProfileRequest,
  ): Promise<AuthResponse> => {
    console.log("API: Sending profile update request:", userData);
    const response = await api.put("/user", userData);
    console.log("API: Profile update response:", response.data);
    return response.data;
  },
};

export const profileApi = {
  getProfile: async (username: string): Promise<ProfileResponse> => {
    const response = await api.get(`/profiles/${username}`);
    return response.data;
  },
};

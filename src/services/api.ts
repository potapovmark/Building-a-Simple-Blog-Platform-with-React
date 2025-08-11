import axios from "axios";
import {
  ArticlesResponse,
  SingleArticleResponse,
  LoginRequest,
  RegistrationRequest,
  UpdateProfileRequest,
  AuthResponse,
  ProfileResponse,
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
    const response = await api.put("/user", { user: userData });
    return response.data;
  },
};

export const profileApi = {
  getProfile: async (username: string): Promise<ProfileResponse> => {
    const response = await api.get(`/profiles/${username}`);
    return response.data;
  },
};

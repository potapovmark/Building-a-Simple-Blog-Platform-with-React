import axios from "axios";
import { ArticlesResponse, SingleArticleResponse } from "../types";

const API_BASE_URL = "https://realworld.habsida.net/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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

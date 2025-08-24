import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { articlesApi } from "../services/api";
import "./Auth.css";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  body: yup.string().required("Body is required"),
  tagList: yup.string().optional().nullable(),
});

const EditArticle: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const [article, setArticle] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (slug) {
          const response = await articlesApi.getArticle(slug);
          const articleData = response.article;

          // Check if user is the author
          if (articleData.author.username !== user?.username) {
            navigate("/");
            return;
          }

          setArticle(articleData);
          setValue("title", articleData.title);
          setValue("description", articleData.description);
          setValue("body", articleData.body);
          setValue("tagList", articleData.tagList.join(", "));
        }
      } catch (error) {
        setServerError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && slug) {
      fetchArticle();
    }
  }, [slug, user, navigate, setValue]);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setServerError("");

      // Проверяем, что пользователь авторизован
      if (!user) {
        setServerError("User not authenticated");
        return;
      }

      // Проверяем токен
      const token = localStorage.getItem("token");
      if (!token) {
        setServerError("Authentication token not found");
        return;
      }

      const tagList = data.tagList
        ? data.tagList
            .split(",")
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag)
        : [];

      const articleData = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList,
      };

      console.log("Updating article data:", articleData);
      await articlesApi.updateArticle(slug!, articleData);
      navigate(`/articles/${slug}`);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setServerError(errorMessages.join(". "));
      } else if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else if (error.message) {
        setServerError(error.message);
      } else {
        setServerError(
          "An error occurred while updating the article. Please try again.",
        );
      }
      console.error("Article update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  if (isLoading) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h1>Article not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Edit Article</h1>

        {serverError && <div className="error-message">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Article Title"
              {...register("title")}
              className={errors.title ? "error" : ""}
            />
            {errors.title && (
              <span className="error-text">{errors.title.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="What's this article about?"
              {...register("description")}
              className={errors.description ? "error" : ""}
            />
            {errors.description && (
              <span className="error-text">{errors.description.message}</span>
            )}
          </div>

          <div className="form-group">
            <textarea
              placeholder="Write your article (in markdown)"
              rows={8}
              {...register("body")}
              className={errors.body ? "error" : ""}
            />
            {errors.body && (
              <span className="error-text">{errors.body.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter tags (comma separated)"
              {...register("tagList")}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;

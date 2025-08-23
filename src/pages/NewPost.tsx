import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  body: yup.string().required("Article body is required"),
  tagList: yup.string().optional(),
});

const NewPost: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setServerError("");

      // TODO: Implement API call to create article
      // For now, just redirect to home
      navigate("/");
    } catch (error: any) {
      setServerError(
        "An error occurred while creating the article. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Create New Article</h1>

        {serverError && <div className="server-error">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <input
              {...register("title")}
              type="text"
              placeholder="Article Title"
              className={errors.title ? "error" : ""}
            />
            {errors.title && (
              <span className="error-message">{errors.title.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("description")}
              type="text"
              placeholder="What's this article about?"
              className={errors.description ? "error" : ""}
            />
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <textarea
              {...register("body")}
              placeholder="Write your article (in markdown)"
              rows={10}
              className={errors.body ? "error" : ""}
            />
            {errors.body && (
              <span className="error-message">{errors.body.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("tagList")}
              type="text"
              placeholder="Enter tags (comma separated)"
              className={errors.tagList ? "error" : ""}
            />
            {errors.tagList && (
              <span className="error-message">{errors.tagList.message}</span>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;

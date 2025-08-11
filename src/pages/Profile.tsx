import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

const schema = yup.object({
  username: yup.string().required("Имя пользователя обязательно"),
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите корректный email"),
  bio: yup.string().optional(),
  image: yup.string().url("Введите корректный URL").optional(),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(40, "Пароль должен содержать максимум 40 символов")
    .optional(),
});

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
      image: user?.image || "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setServerError("");

      const updateData: any = {};
      if (data.username) updateData.username = data.username;
      if (data.email) updateData.email = data.email;
      if (data.bio !== undefined) updateData.bio = data.bio;
      if (data.image !== undefined) updateData.image = data.image;
      if (data.password) updateData.password = data.password;

      await updateProfile(updateData);
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setServerError(errorMessages.join(", "));
      } else {
        setServerError("Произошла ошибка при обновлении профиля");
      }
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
        <h1>Редактировать профиль</h1>

        {serverError && <div className="server-error">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <input
              {...register("username")}
              type="text"
              placeholder="Имя пользователя"
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <span className="error-message">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <textarea
              {...register("bio")}
              placeholder="О себе"
              rows={3}
              className={errors.bio ? "error" : ""}
            />
            {errors.bio && (
              <span className="error-message">{errors.bio.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("image")}
              type="url"
              placeholder="URL аватара"
              className={errors.image ? "error" : ""}
            />
            {errors.image && (
              <span className="error-message">{errors.image.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("password")}
              type="password"
              placeholder="Новый пароль (оставьте пустым, если не хотите менять)"
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  bio: yup.string().nullable().optional(),
  image: yup.string().url("Please enter a valid URL").nullable().optional(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must be no more than 40 characters")
    .optional(),
});

const Settings: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  // Обновляем форму при изменении данных пользователя
  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("bio", user.bio || "");
      setValue("image", user.image || "");
      // Пароль всегда остается пустым для безопасности
      setValue("password", "");
    }
  }, [user, setValue, updateTrigger]);

  const onSubmit = async (data: any) => {
    try {
      console.log("=== FORM SUBMISSION START ===");
      console.log("Form data received:", data);
      console.log("Current user:", user);
      
      setIsSubmitting(true);
      setServerError("");
      setSuccessMessage("");

      // Подготавливаем данные для отправки, исключая пустые поля
      const updateData: any = {};

      // Обязательные поля всегда отправляем
      updateData.username = data.username;
      updateData.email = data.email;

      // Опциональные поля отправляем только если они заполнены
      if (data.bio !== undefined && data.bio !== "") {
        updateData.bio = data.bio;
      } else {
        updateData.bio = null;
      }

      if (data.image !== undefined && data.image !== "") {
        updateData.image = data.image;
      } else {
        updateData.image = null;
      }

      if (data.password && data.password.trim() !== "") {
        updateData.password = data.password;
      }

      console.log("Prepared update data:", updateData);
      console.log("Before updateProfile - current user:", user?.username);

      await updateProfile(updateData);

      console.log("After updateProfile - current user:", user?.username);
      console.log("=== FORM SUBMISSION SUCCESS ===");

      // Очищаем поле пароля после успешного сохранения
      setValue("password", "");

      // Показываем сообщение об успехе
      setServerError(""); // Очищаем предыдущие ошибки
      setSuccessMessage("Profile updated successfully!");

      // Автоматически скрыть сообщение об успехе через 3 секунды
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      // Принудительно обновляем форму
      setUpdateTrigger((prev) => prev + 1);
    } catch (error: any) {
      console.log("=== FORM SUBMISSION ERROR ===");
      console.log("Error object:", error);
      console.log("Error response:", error.response);
      console.log("Error message:", error.message);
      
      if (error.response?.data?.errors) {
        // Обрабатываем ошибки API и делаем их более понятными
        const errorMessages = [];
        const errors = error.response.data.errors;

        if (errors.username) {
          errorMessages.push("Username: " + errors.username.join(", "));
        }
        if (errors.email) {
          errorMessages.push("Email: " + errors.email.join(", "));
        }
        if (errors.password) {
          errorMessages.push("Password: " + errors.password.join(", "));
        }
        if (errors.bio) {
          errorMessages.push("Bio: " + errors.bio.join(", "));
        }
        if (errors.image) {
          errorMessages.push("Avatar: " + errors.image.join(", "));
        }

        setServerError(errorMessages.join(". "));
      } else {
        setServerError(
          "An error occurred while updating the profile. Please try again.",
        );
      }
    } finally {
      console.log("=== FORM SUBMISSION FINALLY ===");
      console.log("Setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Account Settings</h1>

        {serverError && <div className="server-error">{serverError}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form 
          onSubmit={handleSubmit((data) => {
            console.log("handleSubmit callback triggered with data:", data);
            return onSubmit(data);
          })} 
          className="auth-form"
        >
          <div className="form-group">
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
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
              placeholder="Short bio about you"
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
              placeholder="URL of profile picture"
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
              placeholder="New Password"
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
            data-no-icon
          >
            {isSubmitting ? "Updating..." : "Update Settings"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {successMessage && (
            <button
              onClick={() => navigate("/")}
              className="auth-button"
              style={{ marginBottom: "10px", backgroundColor: "#28a745" }}
            >
              Go to Home
            </button>
          )}
          <button
            onClick={handleLogout}
            className="logout-button"
            style={{ marginTop: "10px" }}
          >
            Or click here to logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

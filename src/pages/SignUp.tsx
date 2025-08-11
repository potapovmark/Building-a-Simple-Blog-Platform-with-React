import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

const schema = yup.object({
  username: yup
    .string()
    .required("Имя пользователя обязательно")
    .min(3, "Имя пользователя должно содержать минимум 3 символа")
    .max(20, "Имя пользователя должно содержать максимум 20 символов"),
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите корректный email"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(40, "Пароль должен содержать максимум 40 символов"),
  confirmPassword: yup
    .string()
    .required("Подтвердите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать"),
  agreeToTerms: yup
    .boolean()
    .required("Необходимо согласие на обработку персональных данных")
    .oneOf([true], "Необходимо согласие на обработку персональных данных"),
});

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsSubmitting(true);
      setServerError("");
      await registerUser(data.username, data.email, data.password);
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setServerError(errorMessages.join(", "));
      } else {
        setServerError("Произошла ошибка при регистрации");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Регистрация</h1>

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
            <input
              {...register("password")}
              type="password"
              placeholder="Пароль"
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Подтвердите пароль"
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-message">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input {...register("agreeToTerms")} type="checkbox" />
              <span>Я согласен на обработку персональных данных</span>
            </label>
            {errors.agreeToTerms && (
              <span className="error-message">
                {errors.agreeToTerms.message}
              </span>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className="auth-links">
          Уже есть аккаунт? <Link to="/sign-in">Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

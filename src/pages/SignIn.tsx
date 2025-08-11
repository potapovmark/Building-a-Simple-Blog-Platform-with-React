import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

const schema = yup.object({
  email: yup
    .string()
    .required("Email обязателен")
    .email("Введите корректный email"),
  password: yup.string().required("Пароль обязателен"),
});

type SignInFormData = yup.InferType<typeof schema>;

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsSubmitting(true);
      setServerError("");
      await login(data.email, data.password);
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setServerError(errorMessages.join(", "));
      } else {
        setServerError("Неверный email или пароль");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Вход</h1>

        {serverError && <div className="server-error">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className="auth-links">
          Нет аккаунта? <Link to="/sign-up">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

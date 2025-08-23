import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, UpdateProfileRequest } from "../types";
import { authApi } from "../services/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userVersion: number;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: UpdateProfileRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userVersion, setUserVersion] = useState(0);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await authApi.getCurrentUser();
          setUser(response.user);
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const userData = response.user;
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const response = await authApi.register({ username, email, password });
    const userData = response.user;
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const updateProfile = async (userData: UpdateProfileRequest) => {
    try {
      console.log("AuthContext: Starting profile update...");
      const response = await authApi.updateProfile(userData);
      const updatedUser = response.user;

      console.log("AuthContext: Received updated user from API:", updatedUser);

      // Обновляем токен если он изменился
      if (updatedUser.token) {
        localStorage.setItem("token", updatedUser.token);
      }

      // Получаем актуальные данные пользователя с сервера
      console.log("AuthContext: Fetching fresh user data...");
      const freshUserResponse = await authApi.getCurrentUser();
      const freshUser = freshUserResponse.user;

      console.log("AuthContext: Fresh user data from server:", freshUser);

      // Обновляем состояние пользователя свежими данными
      setUser({ ...freshUser });

      // Увеличиваем версию для принудительного обновления всех компонентов
      setUserVersion((prev) => prev + 1);

      console.log(
        "AuthContext: User state updated to:",
        freshUser.username,
        "version:",
        userVersion + 1,
      );
    } catch (error) {
      console.error("AuthContext: Error in updateProfile:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    userVersion,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

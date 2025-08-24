import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import NewPost from "./pages/NewPost";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router basename="/Building-a-Simple-Blog-Platform-with-React">
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route path="/articles" element={<ArticleList />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/new-post" element={<NewPost />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

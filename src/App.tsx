import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 
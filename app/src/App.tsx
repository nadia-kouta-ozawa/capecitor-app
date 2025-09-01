import { useState, useEffect } from 'react'
import type { NewsArticle } from './types/news'
import Header from './components/Header'
import NewsList from './components/NewsList'
import NewsDetail from './components/NewsDetail'
import './App.css'

function App() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      if (stored) {
        return stored === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleArticleSelect = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header 
          onToggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        
        <main>
          {selectedArticle ? (
            <NewsDetail 
              article={selectedArticle}
              onBack={handleBackToList}
            />
          ) : (
            <NewsList 
              onArticleSelect={handleArticleSelect}
            />
          )}
        </main>
      </div>
  );
}

export default App

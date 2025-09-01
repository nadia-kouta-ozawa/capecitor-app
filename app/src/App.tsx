import { useState } from 'react'
import type { NewsArticle } from './types/news'
import Header from './components/Header'
import NewsList from './components/NewsList'
import NewsDetail from './components/NewsDetail'
import './App.css'

function App() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

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
    <div className={isDarkMode ? 'dark' : ''}>
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
    </div>
  );
}

export default App

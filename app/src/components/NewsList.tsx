import { useState, useEffect } from 'react';
import type { NewsArticle } from '../types/news';
import { categories, mockNewsArticles } from '../data/mockNews';
import { newsAPI } from '../services/api';
import { transformNewsArticleFromAPI } from '../utils/transformers';
import NewsCard from './NewsCard';

interface NewsListProps {
  onArticleSelect: (article: NewsArticle) => void;
}

export default function NewsList({ onArticleSelect }: NewsListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsAPI.getAll();
        const transformedArticles = response.data.map(transformNewsArticleFromAPI);
        
        // APIから取得したデータが空の場合はモックデータを使用
        if (transformedArticles.length === 0) {
          setArticles(mockNewsArticles);
        } else {
          setArticles(transformedArticles);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        // エラーの場合はモックデータにフォールバック
        setArticles(mockNewsArticles);
        setError('APIからデータを取得できませんでした。モックデータを表示しています。');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* エラーメッセージ */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {error}
        </div>
      )}

      {/* ローディング状態 */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">ニュースを読み込み中...</p>
        </div>
      )}

      {/* カテゴリフィルター */}
      {!loading && <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          カテゴリ
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>}

      {/* ニュース一覧 */}
      {!loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <NewsCard 
            key={article.id}
            article={article}
            onClick={onArticleSelect}
          />
        ))}
      </div>}

      {/* 記事が見つからない場合 */}
      {!loading && filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            選択したカテゴリには記事がありません
          </p>
        </div>
      )}
    </div>
  );
}
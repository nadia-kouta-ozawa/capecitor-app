import { useState } from 'react';
import type { NewsArticle } from '../types/news';
import { categories, mockNewsArticles } from '../data/mockNews';
import NewsCard from './NewsCard';

interface NewsListProps {
  onArticleSelect: (article: NewsArticle) => void;
}

export default function NewsList({ onArticleSelect }: NewsListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredArticles = selectedCategory === 'all' 
    ? mockNewsArticles 
    : mockNewsArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* カテゴリフィルター */}
      <div className="mb-6">
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
      </div>

      {/* ニュース一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <NewsCard 
            key={article.id}
            article={article}
            onClick={onArticleSelect}
          />
        ))}
      </div>

      {/* 記事が見つからない場合 */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            選択したカテゴリには記事がありません
          </p>
        </div>
      )}
    </div>
  );
}
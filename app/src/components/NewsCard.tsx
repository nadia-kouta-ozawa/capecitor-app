import type { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
  onClick: (article: NewsArticle) => void;
}

export default function NewsCard({ article, onClick }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
      onClick={() => onClick(article)}
    >
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700">
        <img 
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {article.source}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {article.author && `by ${article.author}`}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${
            article.category === 'technology' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
            article.category === 'business' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
            article.category === 'sports' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
            article.category === 'entertainment' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
            article.category === 'science' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' :
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {categories.find(cat => cat.name === article.category)?.label || article.category}
          </span>
        </div>
      </div>
    </article>
  );
}

import { categories } from '../data/mockNews';
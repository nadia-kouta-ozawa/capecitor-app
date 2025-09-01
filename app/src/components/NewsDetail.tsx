import type { NewsArticle } from '../types/news';
import { categories } from '../data/mockNews';

interface NewsDetailProps {
  article: NewsArticle;
  onBack: () => void;
}

export default function NewsDetail({ article, onBack }: NewsDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const categoryLabel = categories.find(cat => cat.name === article.category)?.label || article.category;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* 戻るボタン */}
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        一覧に戻る
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* ヘッダー画像 */}
        <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700">
          <img 
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 記事内容 */}
        <div className="p-6">
          {/* メタデータ */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className={`px-3 py-1 text-sm rounded-full ${
              article.category === 'technology' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
              article.category === 'business' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
              article.category === 'sports' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
              article.category === 'entertainment' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
              article.category === 'science' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' :
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {categoryLabel}
            </span>
            
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {article.source}
            </span>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(article.publishedAt)}
            </span>
          </div>

          {/* タイトル */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          {/* 著者 */}
          {article.author && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              著者: {article.author}
            </p>
          )}

          {/* 概要 */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {article.description}
          </p>

          {/* 本文 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {article.content}
            </p>
          </div>

          {/* 外部リンク */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
            >
              元記事を読む
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
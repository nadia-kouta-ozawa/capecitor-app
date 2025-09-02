import type { NewsArticle } from '../types/news';
import type { NewsArticleAPI } from '../services/api';

export function transformNewsArticleFromAPI(apiArticle: NewsArticleAPI): NewsArticle {
  return {
    id: apiArticle.id.toString(),
    title: apiArticle.title,
    description: apiArticle.description,
    content: apiArticle.content,
    imageUrl: apiArticle.image_url || '',
    publishedAt: apiArticle.published_at,
    source: apiArticle.source,
    category: apiArticle.category,
    author: apiArticle.author || undefined,
    url: apiArticle.url
  };
}

export function transformNewsArticleToAPI(article: Omit<NewsArticle, 'id'>): Omit<NewsArticleAPI, 'id' | 'created_at' | 'updated_at'> {
  return {
    title: article.title,
    description: article.description,
    content: article.content,
    image_url: article.imageUrl || null,
    published_at: article.publishedAt,
    source: article.source,
    category: article.category,
    author: article.author || null,
    url: article.url
  };
}
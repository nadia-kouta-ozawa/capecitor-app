export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: string;
  author?: string;
  url: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  label: string;
}
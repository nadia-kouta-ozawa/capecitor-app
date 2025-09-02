// Capacitor環境でのAPI URL設定
const getApiBaseUrl = () => {
  // 開発環境（ブラウザ）
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    return 'http://127.0.0.1:8000/api';
  }
  
  // Capacitorアプリ（iOS/Android）
  // 実際のIPアドレスを使用（ローカルネットワークの場合）
  // 本番環境では実際のサーバーURLに変更してください
  return 'http://192.168.11.8:8000/api'; // 実際のマシンのIPアドレス
};

const API_BASE_URL = getApiBaseUrl();

export interface NewsArticleAPI {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string | null;
  published_at: string;
  source: string;
  category: string;
  author: string | null;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
}

export const newsAPI = {
  async getAll(): Promise<PaginatedResponse<NewsArticleAPI>> {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return response.json();
  },

  async getById(id: number): Promise<NewsArticleAPI> {
    const response = await fetch(`${API_BASE_URL}/news/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch news article');
    }
    return response.json();
  },

  async create(data: Omit<NewsArticleAPI, 'id' | 'created_at' | 'updated_at'>): Promise<NewsArticleAPI> {
    const response = await fetch(`${API_BASE_URL}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create news article');
    }
    return response.json();
  },

  async update(id: number, data: Partial<Omit<NewsArticleAPI, 'id' | 'created_at' | 'updated_at'>>): Promise<NewsArticleAPI> {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update news article');
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete news article');
    }
  },
};
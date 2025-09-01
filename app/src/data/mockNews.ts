import type { NewsArticle, NewsCategory } from '../types/news';

export const categories: NewsCategory[] = [
  { id: 'all', name: 'all', label: 'すべて' },
  { id: 'technology', name: 'technology', label: 'テクノロジー' },
  { id: 'business', name: 'business', label: 'ビジネス' },
  { id: 'sports', name: 'sports', label: 'スポーツ' },
  { id: 'entertainment', name: 'entertainment', label: 'エンタメ' },
  { id: 'science', name: 'science', label: '科学' },
];

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'AI技術の最新進歩：生成AIが変える未来',
    description: '人工知能技術の急速な発展により、様々な業界でイノベーションが加速しています。',
    content: '人工知能技術は近年目覚ましい発展を遂げており、特に生成AIの分野では革新的な進歩が続いています...',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    publishedAt: '2025-09-01T07:00:00Z',
    source: 'Tech News',
    category: 'technology',
    author: '田中太郎',
    url: 'https://example.com/ai-advancement'
  },
  {
    id: '2',
    title: '新興企業の成長戦略：スタートアップ投資動向',
    description: '2025年のスタートアップ業界では、AI・フィンテック・ヘルステック分野への投資が活発化しています。',
    content: 'ベンチャーキャピタルからの投資額が前年比30%増加し、特にAI関連企業への注目が高まっています...',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    publishedAt: '2025-09-01T06:30:00Z',
    source: 'Business Today',
    category: 'business',
    author: '佐藤花子',
    url: 'https://example.com/startup-investment'
  },
  {
    id: '3',
    title: '東京オリンピック2024の遺産：スポーツ施設の活用',
    description: '東京オリンピック後のスポーツ施設が地域コミュニティに与える影響について分析します。',
    content: '東京オリンピックから1年が経過し、競技施設の有効活用が重要な課題となっています...',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    publishedAt: '2025-09-01T06:00:00Z',
    source: 'Sports Weekly',
    category: 'sports',
    author: '山田次郎',
    url: 'https://example.com/olympics-legacy'
  },
  {
    id: '4',
    title: '映画業界の新トレンド：ストリーミングvsシアター',
    description: '映画業界では配信サービスと映画館の共存が新たなビジネスモデルを生み出しています。',
    content: '近年のストリーミングサービスの普及により、映画業界の収益構造が大きく変化しています...',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    publishedAt: '2025-09-01T05:30:00Z',
    source: 'Entertainment News',
    category: 'entertainment',
    author: '鈴木美咲',
    url: 'https://example.com/movie-industry'
  },
  {
    id: '5',
    title: '宇宙探査の新展開：月面基地建設プロジェクト',
    description: '国際宇宙機関による月面基地建設計画が本格的に始動し、科学技術の新時代が到来しています。',
    content: '月面での持続可能な人類居住を目指す国際プロジェクトが、2025年から具体的な段階に入りました...',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80',
    publishedAt: '2025-09-01T05:00:00Z',
    source: 'Science Daily',
    category: 'science',
    author: '高橋研一',
    url: 'https://example.com/moon-base'
  },
];
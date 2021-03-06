export interface Article {
  category: string;
  headerText: string;
  previewText: string;
  fullText: string;
  publishDate: string;
}

export interface ArticleCategory {
  label: string;
  description: string;
}

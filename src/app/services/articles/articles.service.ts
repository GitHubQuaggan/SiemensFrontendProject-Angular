import { Injectable } from '@angular/core';
import { getYearFromDate } from 'src/app/components/utils/util-functions';
import { Article, ArticleCategory } from 'src/app/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  getArticleCategories() {
    // Assume that categories are returned from endpoint in asc sorted order
    const categories: ArticleCategory[] = [
      {
        label: 'Customer Story',
        description: 'Read Customer Stories from satisfied users of Siemens Digital Industries Software.'
      },
      {
        label: 'Press Release',
        description: 'Find the latest Press Releases from Siemens Digital Industries Software and stay up-to-date on what\'s happening.'
      },
      {
        label: 'Technology',
        description: 'Read the latest updates on technological advancements from Siemens Digital Industries Software.'
      }
    ];
    return categories;
  }

  getArticles() {
    // Assume articles are returned sorted by publish date desc
    const articles: Article[] = [
      {
        category: 'Press Release',
        headerText: 'PR 1',
        previewText: 'PR 1 Preview',
        fullText: 'PR 1 Full Text',
        publishDate: '03 March 2022'
      },
      {
        category: 'Press Release',
        headerText: 'PR 2',
        previewText: 'PR 2 Preview',
        fullText: 'PR 2 Full Text',
        publishDate: '14 January 2022'
      },
      {
        category: 'Technology',
        headerText: 'TE 1',
        previewText: 'TE 1 Preview',
        fullText: 'TE 1 Full Text',
        publishDate: '23 October 2010'
      },
      {
        category: 'Customer Story',
        headerText: 'CS 1',
        previewText: 'CS 1 Preview',
        fullText: 'CS 1 Full Text',
        publishDate: '22 April 2001'
      },
      {
        category: 'Technology',
        headerText: 'TE 2',
        previewText: 'TE 2 Preview',
        fullText: 'TE 2 Full Text',
        publishDate: '10 December 1990'
      }
    ];
    return articles;
  }

  getArticlesByFilters(categories: string[], yearsPublished: string[]) {
    // Simulate a query to get articles given the specified filter values
    const filteredArticles: Article[] = new Array<Article>();
    const articles = this.getArticles();
    articles.forEach((article) => {
      const filterByYear = yearsPublished.length === 0 || yearsPublished.includes(getYearFromDate(article.publishDate));
      if (categories.includes(article.category) && filterByYear) {
        filteredArticles.push(article);
      }
    });
    return filteredArticles;
  }

  getCategoryDescByLabel(label: string) {
    const categories: ArticleCategory[] = this.getArticleCategories();
    const foundCategory = categories.find((category) => {
      return category.label === label;
    });
    return foundCategory?.description;
  }
}

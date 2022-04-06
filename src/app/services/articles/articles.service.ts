import { Injectable } from '@angular/core';
import { getYearFromDate } from 'src/app/components/utils/util-functions';
import { Article, ArticleCategory } from 'src/app/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  /**
   * Returns a list of article categories (such as from a database).
   * @returns List of article categories
   * */
  getArticleCategories() {
    // Assume that categories are returned from endpoint in asc sorted order by category label
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

  /**
   * Gets all articles. Acts as the Articles table in a database.
   * @returns A list of articles
  */
  private getArticles() {
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

  /**
   * Returns a set of articles that match the specified filters.
   * @param categories An array containing article categories to filter
   * @param yearsPublished An array containing the years published to filter
   * @returns A list of articles that match the filters
  */
  getArticlesByFilters(categories: string[], yearsPublished: string[]) {
    // Simulate a query to get articles given the specified filter values
    const filteredArticles: Article[] = new Array<Article>();
    const articles = this.getArticles();

    articles.forEach((article) => {
      // If the yearsPublished filter is empty, return articles for all years
      const filterByYear = yearsPublished.length === 0 || yearsPublished.includes(getYearFromDate(article.publishDate));

      // Check for match by category and year
      if (categories.includes(article.category) && filterByYear) {
        filteredArticles.push(article);
      }
    });
    return filteredArticles;
  }

  /**
   * Gets the description of a category when given its label.
   * @param label The label of the category
   * @returns The corresponding description of the category
  */
  getCategoryDescByLabel(label: string) {
    // Get all categories
    const categories: ArticleCategory[] = this.getArticleCategories();

    // Find the category that matches the specified label
    const foundCategory = categories.find((category) => {
      return category.label === label;
    });
    return foundCategory?.description;
  }
}

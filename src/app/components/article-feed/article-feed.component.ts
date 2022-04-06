import { Component, OnInit } from '@angular/core';
import { Article, ArticleCategory } from 'src/app/models/article';
import { DropdownItem } from 'src/app/models/dropdown-item';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { getYearFromDate } from '../utils/util-functions';

@Component({
  selector: 'app-article-feed',
  templateUrl: './article-feed.component.html',
  styleUrls: ['./article-feed.component.scss']
})
export class ArticleFeedComponent implements OnInit {
  categoriesDropdown = {
    name: 'Category',
    items: new Array<DropdownItem>()
  };
  yearDropdown = {
    name: 'Year Published',
    items: new Array<DropdownItem>()
  };
  topicDropdown = {
    name: 'Topic',
    items: new Array<DropdownItem>()
  };

  categoryArticleMap: Map<string, Article[]> = new Map<string, Article[]>()
  articleCategories: ArticleCategory[] = new Array<ArticleCategory>();
  articles: Article[] = new Array<Article>();
  displayArticles: Article[] = new Array<Article>();
  selectedCategories: string[] = new Array<string>();
  selectedYearsPublished: string[] = new Array<string>();

  constructor(private readonly articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articleCategories = this.articlesService.getArticleCategories();
    this.articles = this.articlesService.getArticles();
    this.displayArticles = [...this.articles];
    this.populateCategoryDropdown();
    this.populateYearPublishedDropdown();
    this.updateDisplayedArticles();
  }

  populateCategoryDropdown() {
    this.articleCategories.forEach((category) => {
      const index = this.categoriesDropdown.items.findIndex((currentItem) => {
        return currentItem.label === category.label;
      });
      if (index < 0) {
        const dropdownValue = category.label.replace(' ', '_');
        const newItem: DropdownItem = {
          value: dropdownValue,
          name: dropdownValue,
          label: category.label
        }
        this.categoriesDropdown.items.push(newItem);
        this.selectedCategories.push(category.label);
      }
    });
  }

  populateYearPublishedDropdown() {
    this.articles.forEach((article) => {
      const year = getYearFromDate(article.publishDate);
      const index = this.yearDropdown.items.findIndex((currentItem) => {
        return currentItem.value === year;
      });
      if (index < 0) {
        const newItem: DropdownItem = {
          value: year,
          name: year,
          label: year
        }
        this.yearDropdown.items.push(newItem);
        this.selectedYearsPublished.push(year);
      }
    });
  }

  onCategoriesSelected(selectedItems: string[]) {
    this.selectedCategories = selectedItems;
    this.updateDisplayedArticles();
  }

  onYearPublishedSelected(selectedItems: string[]) {
    this.selectedYearsPublished = selectedItems;
    this.updateDisplayedArticles();
  }

  updateDisplayedArticles() {
    this.categoryArticleMap.clear();
    const filteredArticles = this.articlesService.getArticlesByFilters(this.selectedCategories, this.selectedYearsPublished);
    filteredArticles.forEach((article) => {
      const category = article.category;
      if (this.categoryArticleMap.has(category)) {
        this.categoryArticleMap.get(category)?.push(article);
      } else {
        this.categoryArticleMap.set(category, [article]);
      }
    });
    console.log(this.categoryArticleMap);
  }

  getCategoryDescription(label: string) {
    const cat = this.articleCategories.find((category) => {
      return category.label === label;
    });
    return cat?.description;
  }

}

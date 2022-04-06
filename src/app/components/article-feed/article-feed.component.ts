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

  categoryArticleMap: Map<string, Article[]> = new Map<string, Article[]>();

  articleCategories: ArticleCategory[] = new Array<ArticleCategory>();
  currentCategories: string[] = new Array<string>();

  selectedCategories: string[] = new Array<string>();
  selectedYearsPublished: string[] = new Array<string>();

  constructor(private readonly articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.populateCategoryDropdown();
    this.updateDisplayedArticles();
    this.populateYearPublishedDropdown();
  }

  /**
   * Populates the Category dropdown using records retrieved from the ArticlesService.
  */
  populateCategoryDropdown() {
    // Get the articles from the service
    this.articleCategories = this.articlesService.getArticleCategories();

    // Go through each category and add it to the list of dropdown items
    this.articleCategories.forEach((category) => {
      const dropdownValue = category.label.replace(' ', '_');
      const newItem: DropdownItem = {
        value: dropdownValue,
        name: dropdownValue,
        label: category.label
      }
      this.categoriesDropdown.items.push(newItem);

      // Add the category to the list of selected category too
      // All category in the dropdown are selected by default even if their boxes aren't checked
      this.selectedCategories.push(category.label);
    });
  }

  /**
   * Populates the Years Published dropdown using the articles retrieved from the ArticlesService.
   * */
  populateYearPublishedDropdown() {
    // Go through the category/article map
    this.categoryArticleMap.forEach((articles, category, map) => {
      // Go through the articles for each category
      articles.forEach((article) => {
        // Get the year value from the date
        const year = getYearFromDate(article.publishDate);

        // Check the list of dropdown items to see if the current year already exists
        const index = this.yearDropdown.items.findIndex((currentItem) => {
          return currentItem.value === year;
        });

        // If the current year isn't in the list of dropdown items yet, add it
        if (index < 0) {
          const newItem: DropdownItem = {
            value: year,
            name: year,
            label: year
          }
          this.yearDropdown.items.push(newItem);

          // Add the year to the list of selected years too
          // All years in the dropdown are selected by default even if their boxes aren't checked
          this.selectedYearsPublished.push(year);
        }
      });
    });

    // Sort the years by descending value
    this.yearDropdown.items.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      } else if (a.value > b.value) {
        return -1;
      }
      return 0;
    });
  }

  /**
   * Event handler for selecting items in the Category dropdown.
  */
  onCategoriesSelected(selectedItems: string[]) {
    this.selectedCategories = selectedItems;
    this.updateDisplayedArticles();
  }

  /**
   * Event handler for selecting items in the Year Published dropdown.
  */
  onYearPublishedSelected(selectedItems: string[]) {
    this.selectedYearsPublished = selectedItems;
    this.updateDisplayedArticles();
  }

  /**
   * Updates the list of displayed articles matching the filtered categories and years published.
  */
  updateDisplayedArticles() {
    // Reset the displayed articles map
    this.categoryArticleMap.clear();

    // Get a new list of articles matching the selected filters
    const filteredArticles = this.articlesService.getArticlesByFilters(this.selectedCategories, this.selectedYearsPublished);

    // Update the displayed articles map to group the articles by category
    filteredArticles.forEach((article) => {
      const category = article.category;
      if (this.categoryArticleMap.has(category)) {
        // If the map already contains the category, add the article to the existing category's list of articles
        this.categoryArticleMap.get(category)?.push(article);
      } else {
        // Else, add a new entry in the map for the category and its article
        this.categoryArticleMap.set(category, [article]);
      }
    });

    // Save the list of current categories separately for HTML logic
    // Bind this so it can be used in the html
    // https://stackoverflow.com/questions/47079366/expression-has-changed-after-it-was-checked-during-iteration-by-map-keys-in-angu
    this.currentCategories = Array.from(this.categoryArticleMap.keys());
  }

  /**
   * Used in the HTML file to get the description of a category when given its label.
   * @param label The label of the category
   * @returns The corresponding description of the category
  */
  getCategoryDescription(label: string) {
    const cat = this.articleCategories.find((category) => {
      return category.label === label;
    });
    return cat?.description;
  }

}

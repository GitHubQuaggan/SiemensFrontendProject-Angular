import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  categoryLabel: string = '';
  categoryDesc: string = '';
  articles: Article[] = new Array<Article>();

  constructor(private readonly route: ActivatedRoute,
              private readonly articlesService: ArticlesService) { }

  ngOnInit(): void {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Get the category label from the URL param
    this.categoryLabel = this.route.snapshot.paramMap.get('category') ?? '';

    // Get the description of the category
    this.categoryDesc = this.articlesService.getCategoryDescByLabel(this.categoryLabel) ?? '';

    // Get the articles for the category (all publish years)
    this.articles = this.articlesService.getArticlesByFilters([this.categoryLabel], []);
  }

}

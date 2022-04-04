import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArticlesService } from './services/articles/articles.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SubheaderComponent } from './components/subheader/subheader.component';
import { NewsroomHeadingComponent } from './components/newsroom-heading/newsroom-heading.component';
import { FeaturedArticleComponent } from './components/featured-article/featured-article.component';
import { BasicArticleComponent } from './components/basic-article/basic-article.component';
import { ArticleFeedComponent } from './components/article-feed/article-feed.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SubheaderComponent,
    NewsroomHeadingComponent,
    FeaturedArticleComponent,
    BasicArticleComponent,
    ArticleFeedComponent,
    DropdownFilterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ArticlesService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

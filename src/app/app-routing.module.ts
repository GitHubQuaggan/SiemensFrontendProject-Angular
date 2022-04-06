import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { NewsroomPageComponent } from './pages/newsroom-page/newsroom-page.component';

const routes: Routes = [
  { path: 'newsroom', component: NewsroomPageComponent },
  { path: 'article/:category', component: ArticlePageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'newsroom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-article',
  templateUrl: './basic-article.component.html',
  styleUrls: ['./basic-article.component.scss']
})
export class BasicArticleComponent implements OnInit {
  @Input() category = 'Category';
  @Input() headerText = 'Header';
  @Input() previewText = 'Preview';
  @Input() publishDate = 'Date';

  constructor() { }

  ngOnInit(): void {
  }

}

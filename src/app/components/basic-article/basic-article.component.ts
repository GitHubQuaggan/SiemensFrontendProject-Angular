import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-article',
  templateUrl: './basic-article.component.html',
  styleUrls: ['./basic-article.component.scss']
})
export class BasicArticleComponent implements OnInit {
  @Input() category = 'Category';
  @Input() headerTxt = 'HEADER';
  @Input() previewTxt = 'Preview here';
  @Input() publishDate = '03 April 2022';

  constructor() { }

  ngOnInit(): void {
  }

}

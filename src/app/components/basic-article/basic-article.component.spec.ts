import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicArticleComponent } from './basic-article.component';

describe('BasicArticleComponent', () => {
  let component: BasicArticleComponent;
  let fixture: ComponentFixture<BasicArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

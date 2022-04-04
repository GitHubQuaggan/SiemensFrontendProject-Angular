import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsroomHeadingComponent } from './newsroom-heading.component';

describe('NewsroomHeadingComponent', () => {
  let component: NewsroomHeadingComponent;
  let fixture: ComponentFixture<NewsroomHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsroomHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsroomHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

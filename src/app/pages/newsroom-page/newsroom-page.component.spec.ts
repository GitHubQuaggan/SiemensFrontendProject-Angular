import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsroomPageComponent } from './newsroom-page.component';

describe('NewsroomComponent', () => {
  let component: NewsroomPageComponent;
  let fixture: ComponentFixture<NewsroomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsroomPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsroomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

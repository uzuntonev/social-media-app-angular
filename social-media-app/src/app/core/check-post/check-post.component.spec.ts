import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPostComponent } from './check-post.component';

describe('CheckPostComponent', () => {
  let component: CheckPostComponent;
  let fixture: ComponentFixture<CheckPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

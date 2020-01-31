import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousHomeComponent } from './anonymous-home.component';

describe('AnonymousHomeComponent', () => {
  let component: AnonymousHomeComponent;
  let fixture: ComponentFixture<AnonymousHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonymousHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

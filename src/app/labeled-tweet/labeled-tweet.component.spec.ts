import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledTweetComponent } from './labeled-tweet.component';

describe('LabeledTweetComponent', () => {
  let component: LabeledTweetComponent;
  let fixture: ComponentFixture<LabeledTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeledTweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

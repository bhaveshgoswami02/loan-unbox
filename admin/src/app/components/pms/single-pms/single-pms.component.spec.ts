import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePmsComponent } from './single-pms.component';

describe('SinglePmsComponent', () => {
  let component: SinglePmsComponent;
  let fixture: ComponentFixture<SinglePmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPmsComponent } from './all-pms.component';

describe('AllPmsComponent', () => {
  let component: AllPmsComponent;
  let fixture: ComponentFixture<AllPmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

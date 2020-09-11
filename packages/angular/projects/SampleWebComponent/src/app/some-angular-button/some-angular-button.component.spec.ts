import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeAngularButtonComponent } from './some-angular-button.component';

describe('SomeAngularButtonComponent', () => {
  let component: SomeAngularButtonComponent;
  let fixture: ComponentFixture<SomeAngularButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomeAngularButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeAngularButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

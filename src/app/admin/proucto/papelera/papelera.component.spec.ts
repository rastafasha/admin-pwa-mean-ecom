import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeleraComponent } from './papelera.component';

describe('PapeleraComponent', () => {
  let component: PapeleraComponent;
  let fixture: ComponentFixture<PapeleraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PapeleraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PapeleraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

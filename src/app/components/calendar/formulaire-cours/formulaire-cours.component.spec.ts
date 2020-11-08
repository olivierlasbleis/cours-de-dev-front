import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCoursComponent } from './formulaire-cours.component';

describe('FormulaireCoursComponent', () => {
  let component: FormulaireCoursComponent;
  let fixture: ComponentFixture<FormulaireCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

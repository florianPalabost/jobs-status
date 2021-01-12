import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColonneComponent } from './edit-colonne.component';

describe('EditColonneComponent', () => {
  let component: EditColonneComponent;
  let fixture: ComponentFixture<EditColonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditColonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

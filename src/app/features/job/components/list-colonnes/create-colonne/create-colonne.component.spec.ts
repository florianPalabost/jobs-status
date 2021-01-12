import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColonneComponent } from './create-colonne.component';

describe('CreateColonneComponent', () => {
  let component: CreateColonneComponent;
  let fixture: ComponentFixture<CreateColonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateColonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateColonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonneComponent } from './colonne.component';

describe('ColonneComponent', () => {
  let component: ColonneComponent;
  let fixture: ComponentFixture<ColonneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColonneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListColonnesComponent } from './list-colonnes.component';

describe('ListColonnesComponent', () => {
  let component: ListColonnesComponent;
  let fixture: ComponentFixture<ListColonnesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListColonnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

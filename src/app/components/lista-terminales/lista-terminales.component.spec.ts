import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTerminalesComponent } from './lista-terminales.component';

describe('ListaTerminalesComponent', () => {
  let component: ListaTerminalesComponent;
  let fixture: ComponentFixture<ListaTerminalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTerminalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTerminalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

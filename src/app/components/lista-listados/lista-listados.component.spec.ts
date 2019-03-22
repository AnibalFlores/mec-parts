import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaListadosComponent } from './lista-listados.component';

describe('ListaListadosComponent', () => {
  let component: ListaListadosComponent;
  let fixture: ComponentFixture<ListaListadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaListadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaListadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

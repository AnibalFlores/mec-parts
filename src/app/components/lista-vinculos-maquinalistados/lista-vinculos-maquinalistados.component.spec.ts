import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVinculosMaquinalistadosComponent } from './lista-vinculos-maquinalistados.component';

describe('ListaVinculosMaquinalistadosComponent', () => {
  let component: ListaVinculosMaquinalistadosComponent;
  let fixture: ComponentFixture<ListaVinculosMaquinalistadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVinculosMaquinalistadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVinculosMaquinalistadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

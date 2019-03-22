import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarListadosComponent } from './borrar-listados.component';

describe('BorrarListadosComponent', () => {
  let component: BorrarListadosComponent;
  let fixture: ComponentFixture<BorrarListadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarListadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarListadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

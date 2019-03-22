import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarListadosComponent } from './editar-listados.component';

describe('EditarListadosComponent', () => {
  let component: EditarListadosComponent;
  let fixture: ComponentFixture<EditarListadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarListadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarListadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

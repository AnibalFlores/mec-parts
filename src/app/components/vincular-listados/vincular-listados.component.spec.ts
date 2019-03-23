import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularListadosComponent } from './vincular-listados.component';

describe('VincularListadosComponent', () => {
  let component: VincularListadosComponent;
  let fixture: ComponentFixture<VincularListadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VincularListadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularListadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

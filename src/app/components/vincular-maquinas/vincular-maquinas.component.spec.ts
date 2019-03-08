import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularMaquinasComponent } from './vincular-maquinas.component';

describe('VincularMaquinasComponent', () => {
  let component: VincularMaquinasComponent;
  let fixture: ComponentFixture<VincularMaquinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VincularMaquinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

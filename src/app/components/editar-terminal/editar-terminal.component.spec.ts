import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTerminalComponent } from './editar-terminal.component';

describe('EditarTerminalComponent', () => {
  let component: EditarTerminalComponent;
  let fixture: ComponentFixture<EditarTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

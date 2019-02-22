import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarTerminalComponent } from './borrar-terminal.component';

describe('BorrarTerminalComponent', () => {
  let component: BorrarTerminalComponent;
  let fixture: ComponentFixture<BorrarTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

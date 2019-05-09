import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiaClaveComponent } from './cambia-clave.component';

describe('CambiaClaveComponent', () => {
  let component: CambiaClaveComponent;
  let fixture: ComponentFixture<CambiaClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiaClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiaClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

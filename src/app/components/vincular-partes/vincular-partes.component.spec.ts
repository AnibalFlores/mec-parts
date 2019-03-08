import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularPartesComponent } from './vincular-partes.component';

describe('VincularPartesComponent', () => {
  let component: VincularPartesComponent;
  let fixture: ComponentFixture<VincularPartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VincularPartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

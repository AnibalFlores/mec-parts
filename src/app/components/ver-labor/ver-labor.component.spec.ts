import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLaborComponent } from './ver-labor.component';

describe('VerLaborComponent', () => {
  let component: VerLaborComponent;
  let fixture: ComponentFixture<VerLaborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerLaborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLaboresComponent } from './listado-labores.component';

describe('ListadoLaboresComponent', () => {
  let component: ListadoLaboresComponent;
  let fixture: ComponentFixture<ListadoLaboresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoLaboresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoLaboresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

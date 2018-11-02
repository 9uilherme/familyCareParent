import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicamentoComponent } from './list-medicamento.component';

describe('ListMedicamentoComponent', () => {
  let component: ListMedicamentoComponent;
  let fixture: ComponentFixture<ListMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

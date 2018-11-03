import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfissionalComponent } from './list-profissional.component';

describe('ListProfissionalComponent', () => {
  let component: ListProfissionalComponent;
  let fixture: ComponentFixture<ListProfissionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProfissionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

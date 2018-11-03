import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoProfissionalComponent } from './novo-profissional.component';

describe('NovoProfissionalComponent', () => {
  let component: NovoProfissionalComponent;
  let fixture: ComponentFixture<NovoProfissionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoProfissionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

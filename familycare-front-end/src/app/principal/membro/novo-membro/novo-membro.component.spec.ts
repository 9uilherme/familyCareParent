import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoMembroComponent } from './novo-membro.component';

describe('NovoMembroComponent', () => {
  let component: NovoMembroComponent;
  let fixture: ComponentFixture<NovoMembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoMembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

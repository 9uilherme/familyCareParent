import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMembroComponent } from './list-membro.component';

describe('ListMembroComponent', () => {
  let component: ListMembroComponent;
  let fixture: ComponentFixture<ListMembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

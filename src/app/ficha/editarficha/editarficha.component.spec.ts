import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarfichaComponent } from './editarficha.component';

describe('EditarfichaComponent', () => {
  let component: EditarfichaComponent;
  let fixture: ComponentFixture<EditarfichaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarfichaComponent]
    });
    fixture = TestBed.createComponent(EditarfichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

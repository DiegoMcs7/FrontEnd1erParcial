import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarfichaComponent } from './modificarficha.component';

describe('ModificarfichaComponent', () => {
  let component: ModificarfichaComponent;
  let fixture: ComponentFixture<ModificarfichaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarfichaComponent]
    });
    fixture = TestBed.createComponent(ModificarfichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

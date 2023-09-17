import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevafichaComponent } from './nuevaficha.component';

describe('NuevafichaComponent', () => {
  let component: NuevafichaComponent;
  let fixture: ComponentFixture<NuevafichaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevafichaComponent]
    });
    fixture = TestBed.createComponent(NuevafichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

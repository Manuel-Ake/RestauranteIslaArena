import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestoramd } from './gestoramd';

describe('Gestoramd', () => {
  let component: Gestoramd;
  let fixture: ComponentFixture<Gestoramd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gestoramd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gestoramd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

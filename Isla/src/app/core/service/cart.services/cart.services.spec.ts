import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartServices } from './cart.services';

describe('CartServices', () => {
  let component: CartServices;
  let fixture: ComponentFixture<CartServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

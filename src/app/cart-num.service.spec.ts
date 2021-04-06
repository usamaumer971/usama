import { TestBed } from '@angular/core/testing';

import { CartNumService } from './cart-num.service';

describe('CartNumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartNumService = TestBed.get(CartNumService);
    expect(service).toBeTruthy();
  });
});

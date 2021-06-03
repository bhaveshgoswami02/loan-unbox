import { TestBed } from '@angular/core/testing';

import { ManagePharmacyService } from './manage-pharmacy.service';

describe('ManagePharmacyService', () => {
  let service: ManagePharmacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePharmacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

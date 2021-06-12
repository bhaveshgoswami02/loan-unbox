import { TestBed } from '@angular/core/testing';

import { NotificationPermissionService } from './notification-permission.service';

describe('NotificationPermissionService', () => {
  let service: NotificationPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

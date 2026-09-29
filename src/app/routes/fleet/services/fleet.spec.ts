import { TestBed } from '@angular/core/testing';
import { FleetService } from './fleet';

describe('Fleet', () => {
  let service: FleetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

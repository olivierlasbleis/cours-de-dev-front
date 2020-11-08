import { TestBed } from '@angular/core/testing';

import { JoursDeCoursService } from './jours-de-cours.service';

describe('JoursDeCoursService', () => {
  let service: JoursDeCoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoursDeCoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

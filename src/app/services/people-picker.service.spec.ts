import { TestBed } from '@angular/core/testing';

import { PeoplePickerService } from './people-picker.service';

describe('PeoplePickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeoplePickerService = TestBed.get(PeoplePickerService);
    expect(service).toBeTruthy();
  });
});

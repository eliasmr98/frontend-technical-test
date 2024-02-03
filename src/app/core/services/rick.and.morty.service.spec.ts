import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RickAndMortyService } from './rick.and.morty.service';

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RickAndMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

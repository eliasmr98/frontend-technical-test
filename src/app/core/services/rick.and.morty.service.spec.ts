import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RickAndMortyService } from './rick.and.morty.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        RickAndMortyService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(RickAndMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve character list', () => {
    const mockApiResponse = {
      info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          location: { name: 'Planet Earth', url: 'url.sample' },
          status: 'alive',
        },
        {
          id: 2,
          name: 'Morty Smith',
          location: { name: 'Planet Earth', url: 'url.sample' },
          status: 'alive',
        },
      ],
    };
    httpClientSpy.get.and.returnValue(of(mockApiResponse));

    service.getCharacterList().subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    expect(httpClientSpy.get).toHaveBeenCalled();
  });
});

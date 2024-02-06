import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RickAndMortyService } from './rick.and.morty.service';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Character } from '../../interfaces/character';

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

  it('should retrieve the first ten characters', () => {
    const mockApiResponse: Character[] = [
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
    ];
    httpClientSpy.get.and.returnValue(of(mockApiResponse));

    service.getFirstTenCharacters().subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const expectedUrl = `${environment.apiUrlBase}character/1,2,3,4,5,6,7,8,9,10`;
    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
  });
});

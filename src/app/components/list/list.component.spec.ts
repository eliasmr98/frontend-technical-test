import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { ListComponent } from './list.component';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { ApiResponse } from '../../interfaces/api.response';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockRickAndMortyService: jasmine.SpyObj<RickAndMortyService>;

  beforeEach(() => {
    mockRickAndMortyService = jasmine.createSpyObj('RickAndMortyService', [
      'getCharacterList',
    ]);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule],
      providers: [
        { provide: RickAndMortyService, useValue: mockRickAndMortyService },
      ],
    });

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle errors on initialization', () => {
    const errorMessage = 'Error fetching data';
    mockRickAndMortyService.getCharacterList.and.returnValue(
      new Observable((observer) => {
        observer.error(errorMessage);
      })
    );

    fixture.detectChanges();

    expect(component.errorMessage).toBe(errorMessage);
  });

  it('should set characterResults$ on successful initialization', () => {
    const apiResponse: ApiResponse = {
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
    mockRickAndMortyService.getCharacterList.and.returnValue(of(apiResponse));

    fixture.detectChanges();

    expect(component.characterResults$).toBeDefined();
  });
});

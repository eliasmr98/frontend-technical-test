import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ListComponent } from './list.component';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { ApiResponse } from '../../interfaces/api.response';
import { ActivatedRoute } from '@angular/router';

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
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: {} } },
        },
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
      results: [],
    };
    mockRickAndMortyService.getCharacterList.and.returnValue(of(apiResponse));

    fixture.detectChanges();

    expect(component.characterResults$).toBeDefined();
  });

  it('should increment currentPage and fetch characters on nextPage', () => {
    const apiResponse: ApiResponse = {
      info: {
        count: 2,
        pages: 2,
        next: 'some_next_url',
        prev: null,
      },
      results: [],
    };
    mockRickAndMortyService.getCharacterList.and.returnValue(of(apiResponse));

    component.currentPage = 1;
    fixture.detectChanges();

    spyOn(component, 'fetchCharacters');

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(component.fetchCharacters).toHaveBeenCalled();
  });

  it('should decrement currentPage and fetch characters on prevPage', () => {
    const apiResponse: ApiResponse = {
      info: {
        count: 2,
        pages: 2,
        next: null,
        prev: 'some_prev_url',
      },
      results: [],
    };
    mockRickAndMortyService.getCharacterList.and.returnValue(of(apiResponse));

    component.currentPage = 2;
    fixture.detectChanges();

    spyOn(component, 'fetchCharacters');

    component.prevPage();

    expect(component.currentPage).toBe(1);
    expect(component.fetchCharacters).toHaveBeenCalled();
  });
});

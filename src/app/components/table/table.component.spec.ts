import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from './table.component';
import { Character } from '../../interfaces/character';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockRickAndMortyService: jasmine.SpyObj<RickAndMortyService>;

  beforeEach(() => {
    mockRickAndMortyService = jasmine.createSpyObj('RickAndMortyService', [
      'getFirstTenCharacters',
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

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle errors on initialization', () => {
    const errorMessage = 'Error fetching data';
    mockRickAndMortyService.getFirstTenCharacters.and.returnValue(
      new Observable((observer) => {
        observer.error(errorMessage);
      })
    );

    fixture.detectChanges();

    expect(component.errorMessage).toBe(errorMessage);
  });

  it('should set firstTenCharacters$ on successful initialization', () => {
    const firstTenCharacters: Character[] = [];
    mockRickAndMortyService.getFirstTenCharacters.and.returnValue(
      of(firstTenCharacters)
    );

    fixture.detectChanges();

    expect(component.firstTenCharacters$).toBeDefined();
  });
});

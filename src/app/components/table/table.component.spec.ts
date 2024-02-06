import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Character } from '../../interfaces/character';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockRickAndMortyService: jasmine.SpyObj<RickAndMortyService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockRickAndMortyService = jasmine.createSpyObj('RickAndMortyService', [
      'getFirstTenCharacters',
    ]);

    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: RickAndMortyService, useValue: mockRickAndMortyService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
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

  it('should open edit form dialog', () => {
    const character: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      location: {
        name: 'Planet Earth',
        url: 'sample.url',
      },
    };

    component.openEditForm(character);

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '250px',
      data: character,
    });
  });
});

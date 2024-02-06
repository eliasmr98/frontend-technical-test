import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCharacterComponent } from './edit-character.component';
import { Character } from '../../interfaces/character';

describe('EditCharacterComponent', () => {
  let component: EditCharacterComponent;
  let fixture: ComponentFixture<EditCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when cancel button clicked', () => {
    component.onCancelClick();
    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalled();
  });

  it('should close dialog and pass updated character when save button clicked', () => {
    const updatedCharacter: Character = {
      name: 'Updated Name',
      status: 'Updated Status',
      species: 'Updated Species',
      id: 0,
      location: {
        name: '',
        url: '',
      },
    };
    component.data = {
      name: 'Updated Name',
      status: 'Updated Status',
      species: 'Updated Species',
      id: 0,
      location: {
        name: '',
        url: '',
      },
    };
    component.updatedCharacter = updatedCharacter;
    component.onSaveClick();
    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalledWith(
      updatedCharacter
    );
  });
});

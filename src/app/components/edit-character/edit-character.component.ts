import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-edit-character',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-character.component.html',
  styleUrl: './edit-character.component.scss',
})
export class EditCharacterComponent {
  updatedCharacter: Character;
  constructor(
    public dialogRef: MatDialogRef<EditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Character
  ) {
    this.updatedCharacter = { ...data };
  }
  onSaveClick(): void {
    this.data.name = this.updatedCharacter.name;
    this.data.status = this.updatedCharacter.status;
    this.data.species = this.updatedCharacter.species;
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

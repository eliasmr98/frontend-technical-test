import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Character } from '../../interfaces/character';
import { EMPTY, Observable, catchError } from 'rxjs';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { HeaderComponent } from '../header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { EditCharacterComponent } from '../edit-character/edit-character.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [
    AsyncPipe,
    CardComponent,
    ErrorMessageComponent,
    HeaderComponent,
    EditCharacterComponent,
    FooterComponent,
  ],
})
export class TableComponent implements OnInit {
  public firstTenCharacters$!: Observable<Character[]>;
  public errorMessage!: string;
  constructor(private service: RickAndMortyService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.firstTenCharacters$ = this.service.getFirstTenCharacters().pipe(
      catchError((error: any) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }

  openEditForm(character: Character): void {
    this.dialog.open(EditCharacterComponent, {
      width: '250px',
      data: character,
    });
  }
}

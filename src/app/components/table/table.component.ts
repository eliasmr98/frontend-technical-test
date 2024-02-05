import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Character } from '../../interfaces/character';
import { EMPTY, Observable, catchError } from 'rxjs';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [AsyncPipe, CardComponent, ErrorMessageComponent, HeaderComponent],
})
export class TableComponent implements OnInit {
  public firstTenCharacters$!: Observable<Character[]>;
  public errorMessage!: string;
  constructor(private service: RickAndMortyService) {}

  ngOnInit(): void {
    this.firstTenCharacters$ = this.service.getFirstTenCharacters().pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }
}

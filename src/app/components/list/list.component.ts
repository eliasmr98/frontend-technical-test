import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.response';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { HeaderComponent } from '../header/header.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [
    AsyncPipe,
    CardComponent,
    ErrorMessageComponent,
    HeaderComponent,
    PaginationComponent,
  ],
})
export class ListComponent implements OnInit {
  public characterResults$!: Observable<ApiResponse>;
  public errorMessage!: string;
  public currentPage = 1;
  constructor(private service: RickAndMortyService) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.characterResults$ = this.service
      .getCharacterList(this.currentPage)
      .pipe(
        catchError((error: any) => {
          this.errorMessage = error;
          return EMPTY;
        })
      );
  }

  nextPage(): void {
    if (this.characterResults$) {
      this.characterResults$.subscribe((resultObject) => {
        if (resultObject.info.next) {
          this.currentPage++;
          this.fetchCharacters();
        }
      });
    }
  }

  prevPage(): void {
    if (this.characterResults$) {
      this.characterResults$.subscribe((resultObject) => {
        if (resultObject.info.prev) {
          this.currentPage--;
          this.fetchCharacters();
        }
      });
    }
  }
}

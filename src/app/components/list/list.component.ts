import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.response';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [AsyncPipe, CardComponent, ErrorMessageComponent],
})
export class ListComponent implements OnInit {
  public characterResults$!: Observable<ApiResponse>;
  public errorMessage!: string;
  constructor(private service: RickAndMortyService) {}

  ngOnInit(): void {
    this.characterResults$ = this.service.getCharacterList().pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }
}

import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.response';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [AsyncPipe, CardComponent, ErrorMessageComponent, HeaderComponent],
})
export class ListComponent implements OnInit {
  public characterResults$!: Observable<ApiResponse>;
  public errorMessage!: string;
  constructor(private service: RickAndMortyService) {}

  ngOnInit(): void {
    this.characterResults$ = this.service.getCharacterList().pipe(
      catchError((error: any) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }
}

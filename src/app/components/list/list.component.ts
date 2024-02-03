import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RickAndMortyService } from '../../core/services/rick.and.morty.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.response';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe, CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  public characterResults$!: Observable<ApiResponse>;
  constructor(private service: RickAndMortyService) {}

  ngOnInit(): void {
    this.characterResults$ = this.service.getCharacterList();
  }
}

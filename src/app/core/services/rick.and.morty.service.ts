import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.response';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}

  getCharacterList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      'https://rickandmortyapi.com/api/character/?page=1'
    );
  }
}

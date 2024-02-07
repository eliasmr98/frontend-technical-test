import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.response';
import { environment } from '../../../environments/environment.development';
import { Character } from '../../interfaces/character';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}

  getCharacterList(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${environment.apiUrlBase}character/?page=${page}`
    );
  }

  getFirstTenCharacters(): Observable<Character[]> {
    const characterIds = Array.from(
      { length: 10 },
      (_, index) => index + 1
    ).join(',');
    return this.http.get<Character[]>(
      `${environment.apiUrlBase}character/${characterIds}`
    );
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../../interfaces/api.response';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}

  getCharacterList(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>('https://rickandmortyapi.com/apiadad/character/?page=1')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error code: ${error.status}, message: ${error.message}`;
          }

          return throwError(() => errorMessage);
        })
      );
  }
}

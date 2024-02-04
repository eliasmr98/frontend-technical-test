import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';

describe('ErrorHandlerInterceptor', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });

    httpClient = TestBed.inject(HttpClient);
  });

  it('should catch and handle HTTP errors', inject(
    [HttpClient],
    (http: HttpClient) => {
      const mockError = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        error: 'Not Found',
      });

      spyOn(http, 'get').and.returnValue(throwError(() => mockError));

      http.get('/api/some-endpoint').subscribe({
        error: (error) => {
          expect(error instanceof HttpErrorResponse).toBe(true);
          expect(error.status).toEqual(404);
          expect(error.statusText).toEqual('Not Found');
        },
      });
    }
  ));

  it('should catch and handle network errors', inject(
    [HttpClient],
    (http: HttpClient) => {
      const mockError = new ErrorEvent('Network error', {
        message: 'Simulated network error',
      });

      spyOn(http, 'get').and.returnValue(throwError(() => mockError));

      http.get('/api/some-endpoint').subscribe({
        error: (error) => {
          expect(error instanceof ErrorEvent).toBe(true);
          expect(error.message).toEqual('Simulated network error');
        },
      });
    }
  ));
});

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        
        // can be useful to end loading state and let the user know something went wrong
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.olympics$.next({ error: 'Network error. Please check your internet connection.' });
          } else {
            this.olympics$.next({ error: 'Server error. Please try again later.' });
          }
        } else {
          this.olympics$.next({ error: 'An error occurred while loading data.' });
        }
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}

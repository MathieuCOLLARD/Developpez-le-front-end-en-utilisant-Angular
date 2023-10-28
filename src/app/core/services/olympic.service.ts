import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {        
        // can be useful to end loading state and let the user know something went wrong
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            throw new Error('Network error. Please check your internet connection.');
          } else {
            throw new Error('Server error. Please try again later.');
          }
        } else {
          throw new Error('An error occurred while loading data.');
        }
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}

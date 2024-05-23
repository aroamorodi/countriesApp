import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1';

  constructor( private http: HttpClient) { }

  private getCountriesRequest (url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([]))
      //delay(2000)
    );
  }

  searchCountryByAlphaCode (code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiURL}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null),
        catchError(() => of(null))
      );
  }

  searchCapital (term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`
    return this.getCountriesRequest(url);
  }

  searchCountry (term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`
    return this.getCountriesRequest(url);
  }

  searchRegion (term: string): Observable<Country[]> {
    const url = `${this.apiURL}/region/${term}`
    return this.getCountriesRequest(url);
  }
}

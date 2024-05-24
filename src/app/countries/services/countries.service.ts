import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion: { region: '', countries: []}
  }

  constructor( private http: HttpClient) {

  }

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
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term, countries})
      )
  }

  searchCountry (term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = { term, countries})
      );
  }

  searchRegion (term: Region): Observable<Country[]> {
    const url = `${this.apiURL}/region/${term}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = { region: term, countries})
      );
  }
}

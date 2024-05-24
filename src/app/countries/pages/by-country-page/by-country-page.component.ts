import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit{
  public paises: Country[] = [];
  public initialValue: string = '';

  constructor (private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.paises = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByPais(pais: string): void {
    this.countriesService.searchCountry(pais)
      .subscribe(paises => {
        this.paises = paises;
      })
  }
}

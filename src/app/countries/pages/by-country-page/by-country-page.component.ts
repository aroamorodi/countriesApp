import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  public paises: Country[] = [];

  constructor (private countriesService: CountriesService) {}

  searchByPais(pais: string): void {
    this.countriesService.searchCountry(pais)
      .subscribe(paises => {
        this.paises = paises;
      })
  }
}

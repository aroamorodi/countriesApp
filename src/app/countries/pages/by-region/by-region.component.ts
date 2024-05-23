import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styleUrl: './by-region.component.css'
})
export class ByRegionComponent {
  public regions: Country[] = [];

  constructor (private countriesService: CountriesService) {}

  searchByRegion(region: string): void {
    this.countriesService.searchRegion(region)
      .subscribe(regions => {
        this.regions = regions;
      })
  }
}

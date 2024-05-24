import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styleUrl: './by-region.component.css'
})
export class ByRegionComponent implements OnInit {
  public regions: Country[] = [];
  public regiones: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor (private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.regions = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.countriesService.searchRegion(region)
      .subscribe(regions => {
        this.regions = regions;
      })
  }
}

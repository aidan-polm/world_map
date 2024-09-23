import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {
  svgContent: SafeHtml = '';
  selectedCountry: any = null;

  constructor(
    private sanitizer: DomSanitizer,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    const svgPath = 'assests/map-image.svg';
    fetch(svgPath)
      .then(response => response.text())
      .then(svgData => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgData);
      })
      .catch(error => console.log(error))
  }

  onSvgClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.tagName === 'path') {
      const countryId = target.getAttribute('id');
      if (countryId) {
        this.fetchCountryData(countryId);
      }
    }
  }

  fetchCountryData(countryCode: string): void {
    this.countryService.getCountryInfo(countryCode).subscribe(
      data => {
        this.selectedCountry = data[1] && data[1][0];
        this.updateCountryDisplay()
      }
    )
  }

  updateCountryDisplay(error: boolean = false): void {
    const countryInfoDiv = document.getElementById('country-info');
    const countryData = this.selectedCountry;
    if (countryInfoDiv) {
      countryInfoDiv.innerHTML = `
        <div class='info-container'>
          <h3>${countryData.name}</h3>
          <p><b>Region:</b> ${countryData.region.value}</p>
          <p><b>Income Level:</b> ${countryData.incomeLevel.value}</p>
          <p><b>Capital City:</b> ${countryData.capitalCity}</p>
          <p><b>Longitude:</b> ${countryData.longitude}</p>
          <p><b>Latitude:</b> ${countryData.latitude}</p>
        </div>
      `;
    }
  }

  onSvgMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'path') {
      target.style.fill = 'lightblue';
    }
  }

  onSvgMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'path') {
      target.style.fill = '';
    }
  }
}



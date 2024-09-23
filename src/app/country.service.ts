import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl: string = 'http://api.worldbank.org/V2/country/';

  constructor(private http: HttpClient) { }

  getCountryInfo(countryCode: string): Observable<any> {
    const url = `${this.apiUrl}${countryCode}?format=json`;
    return this.http.get<any>(url);
  }
}

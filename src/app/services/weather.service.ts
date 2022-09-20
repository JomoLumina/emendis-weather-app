
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/api.response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeatherData(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${environment.weatherApiBaseUrl}/${cityName}/today`, {
      params: new HttpParams()
      .set('unitGroup', 'metric')
      .set('include', 'days%2Ccurrent')
      .set('key', environment.apiKey)
      .set('contentType', 'json')
    })
  }
}

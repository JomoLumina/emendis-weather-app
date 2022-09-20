import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

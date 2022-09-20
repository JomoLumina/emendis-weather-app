import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/api.response';
import { ICache } from '../models/ICache';

@Injectable({
  providedIn: 'root'
})

export class CacheService {

  //privately stored cache for protection
  private get ourStorage(): Storage {
    return localStorage;
  }

  constructor(){

  }

  setCache(key: string,value: WeatherData | undefined, expiresIn: number = environment.cacheExpiresIn) {
    const _value: ICache = {
      value,
      timestamp: Date.now(),
      expiresIn: expiresIn,
    };

    this.ourStorage.setItem(key,JSON.stringify(_value));
  }

  getCache(key: string): WeatherData | null {
    const value: any = this.ourStorage.getItem(key);

    if (!value) {
      return null;
    }

    const _value: ICache = JSON.parse(value);

    //check expiry date before retrieving the data
    if (Date.now() - _value.timestamp > _value.expiresIn) {
      this.ourStorage.removeItem(key);
      return null;
    }
    return _value.value;
  }

}

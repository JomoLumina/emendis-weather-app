import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/api.response';
import { CacheService } from '../services/cache.service';
import { BOOKMARKS } from '../constants';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input()
  cityName!: string;
  weatherData?: WeatherData;
  isBookmarked: boolean;

  constructor(private weatherService: WeatherService, private cacheService: CacheService) {
    this.isBookmarked = false;
  }

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    const bookmarks = this.getBookmarks();
    if(bookmarks && bookmarks.includes(this.cityName)){
      this.isBookmarked = true;
    }
  }

  private getBookmarks(): string[] | null{
    const bookmarks_json : string | null = localStorage.getItem(BOOKMARKS);
    if(bookmarks_json){
      const bookmarks: string[] = JSON.parse(bookmarks_json);
      return bookmarks;
    }
    return null;
  }

  addBookmark(bookmark: string): void{
    const bookmarks = this.getBookmarks() ?? [];
    if(bookmarks && !bookmarks.includes(bookmark)){
      bookmarks.push(bookmark);
      localStorage.setItem(BOOKMARKS, JSON.stringify(bookmarks));
      this.isBookmarked = true;
    }
  }

  removeBookmark(bookmark: string): void{
    let bookmarks = this.getBookmarks() ?? [];
    if(bookmarks && bookmarks.includes(bookmark)){
      bookmarks = bookmarks.filter(b => b !== bookmark);
      localStorage.setItem(BOOKMARKS, JSON.stringify(bookmarks));
      this.isBookmarked = false;
    }
  }

  private getWeatherData(cityName: string) {
    const data: WeatherData | null = this.cacheService.getCache(cityName);
    if(data){
      this.weatherData = data;
    }else{
      this.weatherService.getWeatherData(cityName)
      .subscribe({
        next: (response: WeatherData | undefined) => {
          this.weatherData = response;
          this.cacheService.setCache(cityName, response);
        }
      });
    }
  }
}

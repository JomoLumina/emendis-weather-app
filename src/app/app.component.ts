import { Component, OnInit } from '@angular/core';
import { VEENENDAAL, CHISINAU, KAUNAS, BOOKMARKS } from './constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cities: string[] = [CHISINAU, KAUNAS, VEENENDAAL];
  title: string = "Weather Application"
  constructor(){

  }

  ngOnInit(): void {
    const bookmarks = this.getBookmarks();
    if(bookmarks){
      this.cities = bookmarks;
      if(!this.cities.includes(CHISINAU)){
        this.cities.push(CHISINAU);
      }
      if(!this.cities.includes(KAUNAS)){
        this.cities.push(KAUNAS);
      }
      if(!this.cities.includes(VEENENDAAL)){
        this.cities.push(VEENENDAAL);
      }
    }
  }

  getBookmarks(): string[] | null{
    const bookmarks_json : string | null = localStorage.getItem(BOOKMARKS);
    if(bookmarks_json){
      const bookmarks: string[] = JSON.parse(bookmarks_json);
      return bookmarks;
    }
    return null;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http'
//const GIPHY_API_KEY = 'EE3h2WcPP0wTZWqaevFaeQzJ0BtNCb70';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';
  private apiKey:       string = 'EE3h2WcPP0wTZWqaevFaeQzJ0BtNCb70';




  constructor( private http: HttpClient ) { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag( tag: string ):void  {
    if( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', 10 )
      .set('q', tag )

    this.http.get(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {
        console.log(resp);
      } )

  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
  }
}

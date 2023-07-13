import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http'
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
//const GIPHY_API_KEY = 'EE3h2WcPP0wTZWqaevFaeQzJ0BtNCb70';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';
  private apiKey:       string = 'EE3h2WcPP0wTZWqaevFaeQzJ0BtNCb70';

  constructor( private http: HttpClient ) {
    //Aquí llamamos la carga del Local Storage. Se carga al ser inyectado este service.
    this.loadLocalStorage();
    if ( this._tagsHistory.length === 0 ) {return;}
    this.searchTag(this._tagsHistory[0]);
  }

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

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
      } )

  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }


  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) { return; }
    //Le pasamos el operador non null (la exclamación) para que TS no indique que esto puede ser nulo
    //Ya nos aseguramos en el condicional anterior que NO va a pasar nunca un nulo. Hay que decírselo
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

  }


}

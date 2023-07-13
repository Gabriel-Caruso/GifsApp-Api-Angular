import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './gif-card.component.html'
})
export class GifCardComponent implements OnInit {

  @Input()
  public gif!: Gif;

  constructor( ) {}
  ngOnInit(): void {
    //El OnInit se lanza una vez Angular haya inizializado. El ngOnInit tiene dentro tareas adicionales de inicialización
    if ( !this.gif ) throw new Error('Gif property required');
  }

}

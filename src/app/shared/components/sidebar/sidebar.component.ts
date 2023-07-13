import { Component } from '@angular/core';
import { SearchBoxComponent } from 'src/app/gifs/components/search-box/search-box.component';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService : GifsService  ) { }

  get tags(): string[] {
   return this.gifsService.tagsHistory;
  }

  searchTag(tag: string): void {
    return this.gifsService.searchTag(tag);
  }
  // searchTag() {
  //   const newTag = this.searchBox.tagInput.nativeElement.value;

  //   this.gifsService.searchTag(newTag);
  //   this.searchBox.tagInput.nativeElement.value = '';
  // }

}

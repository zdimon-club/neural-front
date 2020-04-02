import { Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'app-search-header',
  templateUrl: './search.component.html',
  styleUrls: ['search.component.scss']

})
export class SearchComponent {
  @Output() searchEmmiter: EventEmitter<any> = new EventEmitter();



  constructor() {}


  doSearch() {
    this.searchEmmiter.emit('test');
  }
}

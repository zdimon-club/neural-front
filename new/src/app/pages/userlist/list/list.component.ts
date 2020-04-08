import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pages-userlist-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() users;

  constructor() { }

  ngOnInit() {
  }

}

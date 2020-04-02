import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() isOnline: boolean;
  @Input() cnt: number;
  @Input() cam: boolean;
  @Input() photo: string;

  constructor() { }

  ngOnInit() {
  }

}

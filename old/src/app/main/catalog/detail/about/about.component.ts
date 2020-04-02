import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-about-profile',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}

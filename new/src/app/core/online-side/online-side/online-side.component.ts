

import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'core-online-side',
  templateUrl: './online-side.component.html',
  styleUrls: ['./online-side.component.scss']
})
export class OnlineSideComponent implements OnInit {

  @Input() users;
  constructor(
    
  ) { 
    
   }

  ngOnInit() {
    
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subscribers = [];

  constructor() { }

  ngOnInit() {

    this.subscribers = [
      {
        id: '',
        main_photo: 'https://via.placeholder.com/350x350',
        username: 'sadasdas',
      },
      {
        id: '',
        main_photo: 'https://via.placeholder.com/350x350',
        username: 'sadasdas',
      },
      {
        id: '',
        main_photo: 'https://via.placeholder.com/350x350',
        username: 'sadasdas',
      },
      {
        id: '',
        main_photo: 'https://via.placeholder.com/350x350',
        username: 'sadasdas',
      },
      {
        id: '',
        main_photo: 'https://via.placeholder.com/350x350',
        username: 'sadasdas',
      }, {
        id: '',
        main_photo: 'https://via.placeholder.com/350x350',
        username: 'sadasdas',
      },
      {
        id: '',
        main_photo: 'https://via.placeholder.com/350x350',
        username: 'sadasdas',
      }
    ];
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites = [];

  constructor() { }

  ngOnInit() {
   this.favorites = [
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

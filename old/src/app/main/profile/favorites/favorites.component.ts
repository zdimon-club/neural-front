import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector     : 'app-profile-favorites',
    templateUrl  : './favorites.component.html',
    styleUrls    : ['./favorites.component.scss']
})
export class ProfileFavoritesComponent implements OnInit {

    @Input() favorites;

    constructor() {}


    ngOnInit(): void {

    }


}


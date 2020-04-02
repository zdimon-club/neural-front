import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'app-profile-subscriptions',
    templateUrl  : './subscriptions.component.html',
    styleUrls    : ['./subscriptions.component.scss']
})
export class ProfileSubscriptionsComponent implements OnInit {

    @Input() subscribers;

    constructor() {}


    ngOnInit(): void {

    }


}


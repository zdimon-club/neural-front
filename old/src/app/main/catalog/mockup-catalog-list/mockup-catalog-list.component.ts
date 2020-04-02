import { Component, OnInit } from '@angular/core';
import { User, UserState } from '../../users/store/users.store';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

@Component({
  selector: 'app-mockup-catalog-list',
  templateUrl: './mockup-catalog-list.component.html',
  styleUrls: ['./mockup-catalog-list.component.scss']
})
export class MockupCatalogListComponent implements OnInit {

  users: any;

  masonry_options = {
    itemSelector: '.masonry__card',
    columnWidth: '.masonry__sizer',
    gutter: '.masonry__gutter',
    fitWidth: true,
  };


  constructor(private user_store: Store<UserState>) { }

  ngOnInit() {
    this.updateMasonry;
    this.showMockup()
  }

  showMockup() {
    const MOCK_COUNT = 30;
    const results = {};

    for(let i = 0; i < MOCK_COUNT; i++) results[i] = new User();
    this.users = of(Object.values(results));
    this.users.subscribe();
    // console.log('results', results);
  }

  updateMasonry({ withImagesLoaded = true }) {
    const masonryNode = document.querySelector('#masonry');
    if (masonryNode !== null) {
      if (withImagesLoaded) {
        imagesLoaded(masonryNode, () => {
          const msnry = new Masonry(masonryNode, this.masonry_options);
        });
      } else {
        const msnry = new Masonry(masonryNode, this.masonry_options);
      }
    }

    setTimeout(() => {
      if (masonryNode !== null) {
        if (withImagesLoaded) {
          imagesLoaded(masonryNode, () => {
            const msnry = new Masonry(masonryNode, this.masonry_options);
          });
        } else {
          const msnry = new Masonry(masonryNode, this.masonry_options);
        }
      }
    }, 50);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
})
export class CatalogFilterComponent implements OnInit, OnDestroy {
  private routerSubscribe: any;
  url: string;
  filters = [{ name: 'Online' }, { name: 'Subscribe' }, { name: 'Intelligent choice' }];
  activeFilter = 'Online';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.url = router.url;
    this.routerSubscribe = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        console.log(event.url);
      }
    });
  }

  handleChangeFilter(name) {
    this.activeFilter = name;
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.routerSubscribe) {
      this.routerSubscribe.unsubscribe();
    }
  }
}

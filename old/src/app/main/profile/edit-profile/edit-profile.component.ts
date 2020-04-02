import { CatalogService } from './../../catalog/catalog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  private sub: any;
  public gender: string;

  constructor(
              private route: ActivatedRoute,
              private gallery_service: CatalogService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.gallery_service.get_detail(params.id).subscribe((data: any) => {
        this.gender = data.user.gender;
        console.log(data.user);
      });
    });
  }
}

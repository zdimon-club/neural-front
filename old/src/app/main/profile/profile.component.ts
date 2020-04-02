
import { ShowAlert } from './../../auth/store/session.action';

// author: Dimitry Zharikov zdimon77@gmail.com
import { Observable } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../core/services/image.service';
import { CatalogService } from './../catalog/catalog.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileService } from './profile.service';
import { UploadPhotoDialogComponent } from './upload-photo-dialog/upload-photo-dialog.component';
import { BillingPopupComponent } from './../billing/billing.component';
import { BillingService } from './../billing/billing.service';
import { FeedService } from './../feed/feed.service';
/// Store ///////////////////

import { Store } from '@ngrx/store';
import { FeedState } from './../feed/store/feed.store';
import * as feedActions from './../feed/store/feed.action';
import * as sessionActions from './../../auth/store/session.action';
import { getFeedList } from './../feed/store/feed.selector';
import { SessionState } from './../../auth/store/session.store';
import { selectUser } from './../../auth/store/session.selector';
import { User } from './../users/store/users.store';

///////////////////////

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: any;
  private sub: any;
  public countries: any[];
  public basicForm: FormGroup;
  public verifyForm: FormGroup;
  public pageState = 'main';
  public tabToShow = 'password';
  public createPostField = '';
  public createCommentField = '';
  public passportImage = '';
  public psychImage = '';
  public current_user: Observable<User>;

  @ViewChild('chattextarea', {static: false}) chattextarea: ElementRef;

  public favorites: any = [];

  public subscriptionCount = 24;


  public gallery = [];

  public posts: any;
  public subscribers: any;

  public days = [];

  public months = [
    {name: 'January', value: '01'},
    {name: 'February', value: '02'},
    {name: 'March', value: '03'},
    {name: 'April', value: '04'},
    {name: 'May', value: '05'},
    {name: 'June', value: '06'},
    {name: 'July', value: '07'},
    {name: 'August', value: '08'},
    {name: 'September', value: '09'},
    {name: 'October', value: '10'},
    {name: 'November', value: '11'},
    {name: 'December', value: '12'}
  ];

  public years = [];

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private galleryService: CatalogService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private feed_service: FeedService,
    private feed_store: Store<FeedState>,
    private session_store: Store<SessionState>,
    private billing_service: BillingService
    
  ) {

    /// Store subscriptions /////
    this.posts = this.feed_store.select(getFeedList);
    this.current_user = this.session_store.select(selectUser);

    ////////////////
    this.generateDays();
    this.getCountries();
    this.basicForm = this.fb.group({
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      about_me: [''],
      lookingfor: [''],
      status: [['Married'], Validators.required],
      birthday:  new FormGroup({
        day: new FormControl(null, Validators.required),
        month: new FormControl(null, Validators.required),
        year: new FormControl(null, Validators.required)
      }),
      country: ['', Validators.required],
      city: ['', Validators.required]
    });

    this.verifyForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      passport: [''],
      psychReport: ['']
    });
  }

  ngOnInit() {

    this.getGallery();
    this.getFeed();
    this.getYears();
    this.getUserInfo();


    // upload photo

    this.profileService.photoUploaded$.subscribe(data => {
      this.getGallery();
      this.scrollTop();
      // this.openUploadDialog();
    });

    // subscribers
    this.profileService.getSubscriptionsList().subscribe((res: any) => {
      this.subscribers = res.list;
    });

    // favorites
    this.profileService.getFavoritesList().subscribe((res: any) => {
      this.favorites = res.list;
    });


  }
  
  public replanishPopup() {
    this.billing_service.showDialog();
  }

  private getUserInfo() {
    this.sub = this.route.params.subscribe(params => {
      this.galleryService.get_detail(params.id).subscribe(data => {
        this.user = data;
        this.fillForm();
      });
    });
  }

  private getCountries() {
    this.profileService.getCountriesList().subscribe(res => {
      this.countries = res;
    });
  }

  private generateDays() {
    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        this.days.push('0' + i);
      } else {
        this.days.push(i.toString());
      }
    }
  }

  private fillForm() {
    this.basicForm.setValue({
      country: this.user.user.country,
      city: this.user.user.city,
      lastName: this.user.user.last_name,
      about_me: this.user.user.about_me,
      lookingfor: this.user.user.lookingfor,
      username: this.user.user.username,
      status: [this.getStatus()],
      birthday: {
        day: this.getDay(this.user.user.birthday),
        month: this.getMonth(this.user.user.birthday),
        year: this.getYear(this.user.user.birthday)}
    });
  }

  private getYear(date: string) {
    try {
    return date.split('-')[0].toString();
    } catch {
      return '-';
    }
  }

  private getStatus() {
     this.user.props.forEach(element => {
       if (element.alias === 'marital') {
          console.log(element.value);
          return element.value;
       }
     });
     return null;
  }

  private getMonth(date: string) {
    try {
    return date.split('-')[1].toString();
    } catch {
      return '-';
    }
  }

  private getDay(date: string) {
    try {
    return date.split('-')[2].toString();
    } catch {
      return '-';
    }
  }
  private getGallery() {
    this.profileService.getProfileMyPhoto().subscribe(res => {
      this.gallery = res.results_list;
    });
  }

  public getYears(): void {
    const data = new Date();
    const fullYear = data.getFullYear();

    for (let i = 1905; i < fullYear; i++) {
      this.years.push(i);
    }
    this.years.reverse();
  }

  public goAllFavorites() {

  }

  public goAllSubscriptions() {

  }

  public onEdit(e): void {
    this.pageState = e;
  }

  public onVerify(): void {
    this.pageState = 'verify';
  }

  public changePage(page: string) {
    this.pageState = page;
    this.scrollTop();
  }

  public likePost(inedx) {

  }

  private scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public cancel() {
    this.pageState = 'main';
    this.scrollTop();
  }

  public openPostComments(index): void {
    this.posts[index].commentsOpened = !this.posts[index].commentsOpened;
  }

  public deletePost(i): void {

  }

  openChangePassword(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '450px',
      data: {name: 'dima'}
    });
  }

  public onSave(): void {
    if (!this.basicForm.invalid) {
      this.profileService.saveProfile(this.basicForm.value).subscribe((res => {
        this.openSnackBar(res.message, 'ok');
        this.pageState = 'main';
        this.getUserInfo();
        this.scrollTop();
      }));
    }
  }

  public detailSaved(data: any): void {
        this.openSnackBar(data.message, 'ok');
        this.pageState = 'main';
        this.getUserInfo();
        this.scrollTop();

  }

  public feedSaved(data: any): void {
    this.openSnackBar(data.message, 'ok');
    this.pageState = 'main';
    this.getFeed();
    this.scrollTop();

  }

  public onVerifySave(): void {
    const formToSave = this.verifyForm.value;
    if (!this.verifyForm.invalid) {
      formToSave.passport = this.passportImage;
      formToSave.psychReport = this.psychImage;
      this.profileService.saveDocuments(formToSave).subscribe((res => {
        if (res.status === 0) {
        this.openSnackBar(res.message, 'ok');
        this.scrollTop();
        this.pageState = 'main';
        } else {
          this.openSnackBar(res.message, 'Error');
        }
      }));
    }

  }

  public onFileChange(event, type): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.imageService.getBase64(file).subscribe(data => {
        if (type === 'passport') {
          this.passportImage = data;
        }
        if (type === 'report') {
          this.psychImage = data;
        }
      });
    }
  }

  public deleteImg(type: string): void {
      if (type === 'passport') {
        this.passportImage = '';
      }

      if (type === 'report') {
        this.psychImage = '';
      }
  }

  ////// Feed section ////////////////////

  private getFeed() {
    this.feed_store.dispatch(new feedActions.LoadMyFeedRequest(1));
  }

  doDeletePost(post: any) {
    this.feed_service.removeFeed(post.id).subscribe((res: any) => {
      this.openSnackBar(res.message, 'ok');
      // this.scrollTop();
      this.getFeed();
    });
  }

  doAddComment(data: any) {
    console.log(data);
    this.feed_store.dispatch(new feedActions.AddCommentRequest(data));
  }

  doAddLike(data: any) {
    this.feed_store.dispatch(new feedActions.AddLikeRequest(data));
    // this.session_store.dispatch(new sessionActions.ShowAlert(data));
  }

  ////////////////////////////////////////

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public openUploadDialog(): void {
    this.dialog.open(UploadPhotoDialogComponent).afterClosed().subscribe( () => {
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

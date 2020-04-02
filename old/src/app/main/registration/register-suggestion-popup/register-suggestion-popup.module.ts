import { ImageService } from './../../../core/services/image.service';


import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared.module';
import { RegisterSuggestionPopupComponent } from './register-suggestion-popup.component';
import { RegisterSuggestionPopupDesktopComponent } from './desktop/desktop.component';
import { RegisterSuggestionPopupMobileComponent } from './mobile/mobile.component';
import { RegisterWomanComponent } from './../woman/register.woman.component';
import { RegisterPhotoVideoFormComponent } from './../photo-video-form/photo-video-form.component';

@NgModule({
  declarations: [
    RegisterSuggestionPopupComponent,
    RegisterSuggestionPopupDesktopComponent,
    RegisterSuggestionPopupMobileComponent,
    RegisterWomanComponent,
    RegisterPhotoVideoFormComponent
  ],
  imports: [SharedModule],
  exports: [
    RegisterSuggestionPopupComponent,
    RegisterSuggestionPopupDesktopComponent,
    RegisterSuggestionPopupMobileComponent,
  ],
  entryComponents: [RegisterWomanComponent, RegisterPhotoVideoFormComponent],
  providers: [ImageService]
})
export class RegisterSuggestionPopupModule {}

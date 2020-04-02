import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ImageService {

    public getBase64fromFile(file: any): Promise<any> {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload =  () => {
                const imgd = reader.result as string;
                resolve(imgd);
            };
        });
      }

  public getBase64(file) {
    return new Observable((observer: Observer<string>) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload =  () => {
        const imgd = reader.result as string;
        observer.next(imgd);
        // observer.next(imgd.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
        observer.complete();
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
        observer.complete();
      };
    });
  }

  getBase64ImageFromURL(url: string) {
    return new Observable((observer: Observer<string>) => {
      // create an image object
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    const canvas = document.createElement('canvas');
    canvas.width = img.width || img.naturalWidth;
    canvas.height = img.height || img.naturalHeight;
    const ctx = canvas.getContext('2d');
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }


}

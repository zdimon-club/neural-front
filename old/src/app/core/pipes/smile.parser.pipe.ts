import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smile'
})
export class ParseSmilePipe  implements PipeTransform {
  transform(array: any, smiles: any): any[] {
    // console.log(smiles);
    // console.log(array);
    if (!Array.isArray(array)) {
      let msg = array;
      for (const s of smiles) {
        msg = msg.split(s.alias).join(`<img src="${s.image}">`);
      }
      return msg;
    } else {
      for (const i of array) {
        if (i.hasOwnProperty('message')) {
          let msg = i.message;
          if (!Array.isArray(smiles)) {
            return;
          }
          for (const s of smiles) {
            msg = msg.split(s.alias).join(`<img src="${s.image}">`);
          }
          i.message = msg;
        }

        if (i.hasOwnProperty('text')) {
          let msg = i.text;
          if (!Array.isArray(smiles)) {
            return;
          }
          for (const s of smiles) {
            msg = msg.split(s.alias).join(`<img src="${s.image}">`);
          }
          i.text = msg;
        }
      }
      return array;
    }
  }
}

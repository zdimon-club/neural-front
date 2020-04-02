import { DropMenuType } from './dropmenu-types.enum';

export interface DropMenu {
  iconOn: string;
  iconOff: string;
  type: DropMenuType;
  buttons: Button[];
}

export interface Button {
  title: string;
  iconOn: string;
  iconOff: string;
  action: 'navigate' | 'offWebCam';
  arg: string;
}

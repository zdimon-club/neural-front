import { Observable } from 'rxjs';

export interface ModalState {
  title: string;
  type: 'default' | 'warning';
  content: string;
  buttons: ModalButton[];
}

interface ModalButton {
  title: string;
  type: 'default' | 'outline';
  action: 'accept' | 'reject' | 'navigate';
  link?: string;
}

export const defaultState = null;

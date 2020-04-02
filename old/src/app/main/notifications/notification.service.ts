import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MessageNotification} from './messages/store/messages.store';
import { Event } from './events/store/events.store';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  public getMessageNotification(): Observable<{result: MessageNotification[]}> {
    return this.http.get<{result: MessageNotification[]}>(`${environment.apiUrl}/notifications/get/chat`);
  }

  public getEventNotification(): Observable<{result: Event[]}> {
    return this.http.get<{result: Event[]}>(`${environment.apiUrl}/notifications/get/events`);
  }

  public sendMessageRead(notificationId): any {
    return this.http.post(`${environment.apiUrl}/notification/read`, notificationId);
  }
}

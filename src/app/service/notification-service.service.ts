import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardResponse } from '../model/standard-response';
import { User } from '../model/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private http: HttpClient, private authenticationService:AuthenticationService) {}
  
  sendNotification(accessToken:string, recipientId:string, subject:string, message:string): Observable<StandardResponse<null>>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    const messageMap: { [key: string]: string } = {
      Recipient: recipientId,
      Subject: subject,
      Message: message
    };
    return this.http.post<StandardResponse<null>>(
      'http://localhost:8000/user/sendNotification',
      messageMap,
       { headers }
    );
    }

}

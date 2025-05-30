import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { StandardResponse } from '../model/standard-response';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserAccountStatus } from '../model/user-account_status.enum';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient, private authenticationService:AuthenticationService) {}

    registerUser(user:User): Observable<StandardResponse<null>>{
      return this.http.post<StandardResponse<null>>(
          'http://localhost:8000/user/initiateUserRegistration',
          user
      );
    }

    createAccount(verificationToken:string): Observable<StandardResponse<null>>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${verificationToken}`
      });
      return this.http.post<StandardResponse<null>>(
        'http://localhost:8000/user/userRegistration',
         null,
         { headers }
      );
    }

    deleteAccount(accessToken:string): Observable<StandardResponse<null>>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      });
      return this.http.delete<StandardResponse<null>>(
        'http://localhost:8000/user/deleteAccount',
         { headers }
      );
    }

    upgradeUser(accessToken:string, email:string): Observable<StandardResponse<null>>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      });
      return this.http.put<StandardResponse<null>>(
        'http://localhost:8000/user/upgradeUser',
        email,
        { headers }
      );
    }

    updateAccountStatus(accessToken:string, email:string, newAccountStatus:string){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      });
      return this.http.put<StandardResponse<null>>(
        'http://localhost:8000/user/updateAccountStatus?newAccountStatus='+newAccountStatus,
        email,
        { headers }
      );
    }
}
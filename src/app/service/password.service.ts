import { Injectable } from '@angular/core';
import { StandardResponse } from '../model/standard-response';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient, private authenticationService:AuthenticationService) {}
  
  forgotPassword(email: string): Observable<StandardResponse<null>> {
      return this.http.post<StandardResponse<null>>(
        `http://localhost:8000/user/forgotPassword`,
        email
      );
    }

    resetPassword(verificationToken:string, newPassword:string): Observable<StandardResponse<null>> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${verificationToken}`
      });
      return this.http.put<StandardResponse<null>>(
        `http://localhost:8000/user/resetPassword`,
        { headers }
      );
    }

    changePassword(accessToken:string, oldPassword:string, newPassword:string): Observable<StandardResponse<null>> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      });
      const passwordMap: { [key: string]: string } = {
        oldPassword: oldPassword,
        newPassword: newPassword
      };
      return this.http.put<StandardResponse<null>>(
        `http://localhost:8000/user/changePassword`,
        passwordMap,
        { headers }
      );
    }
}

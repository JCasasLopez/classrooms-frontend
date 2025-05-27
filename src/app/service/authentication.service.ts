import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StandardResponse } from '../model/standard-response';
import { LoginResponse } from '../model/login-response';
import { User } from '../model/user';
import { UserRole } from '../model/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User = null;
  accessToken: string = null;
  refreshToken: string = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<StandardResponse<LoginResponse>> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<StandardResponse<LoginResponse>>(
          'http://localhost:8000/user/login',
          body.toString(),
          { headers }
    );
  }

  logout(): void {
    if (!this.isAuthenticated()) {
      this.clearSession();
      return;
    }
    const refreshToken = this.getRefreshToken();
    const headers = { 'Authorization': `Bearer ${refreshToken}` };
    this.http.post<StandardResponse<null>>(
          'http://localhost:8000/user/logout', 
          null, 
          { headers })
      .subscribe({
        next: () => this.clearSession(),

        // Invalid token: logout anyway.
        error: () => this.clearSession() 
      });
    }

  refreshSession(): Observable<StandardResponse<LoginResponse>> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return new Observable((observer) => {
        this.clearSession();
        observer.error('No refresh token available');
      });
    }
    const headers = { 'Authorization': `Bearer ${refreshToken}` };
    return this.http.post<StandardResponse<LoginResponse>>(
      'http://localhost:8000/user/refreshToken',
      null,
      { headers }
    );
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  setTokens(refreshToken: string, accessToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken(): string {
    if (this.accessToken !== null) {
      return this.accessToken;
    }
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string {
    if (this.refreshToken !== null) {
      return this.refreshToken;
    }
    return localStorage.getItem('refresh_token');
  }

  clearSession(): void {
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null && this.getAccessToken() !== '';
  }

  getUserRoles(): UserRole[] {
    return this.user?.roles?.map(r => r.roleName) ?? [];
  }

  isAdmin(): boolean {
    const roles = this.getUserRoles();
    return roles.includes(UserRole.ROLE_ADMIN) || roles.includes(UserRole.ROLE_SUPERADMIN);
  }

}

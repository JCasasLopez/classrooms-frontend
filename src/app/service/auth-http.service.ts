import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './authentication.service';
import { StandardResponse } from '../model/standard-response';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Executes an authenticated request. If the access token is invalid (401),
  // it tries to refresh the session once. If the refresh also fails,
  // it logs the user out and redirects to the home page.
  private executeWithAuthRetry<T>(
    request: () => Observable<StandardResponse<T>>,
    hasRefreshed = false
  ): Observable<StandardResponse<T>> {
    return new Observable(observer => {
      request().subscribe({
        next: res => {
          // Successful request: forward response to observer
          observer.next(res);
        },
        error: err => {
          const errorStatus = err.error?.status || err.status || 500;
          const errorMsg = err.error?.message || 'Unexpected error';

          // Error response (not 401): just show error message
          if (errorStatus !== 401 || hasRefreshed) {
            this.toastr.error(`Message: ${errorMsg}`, `Status: ${errorStatus}`);

            // Error response 401 and tokens already refreshed: logout and redirect
            if (errorStatus === 401) {
              this.auth.logout();
              this.router.navigate(['/']);
            }

            // Forward the error to the caller
            observer.error(err);
          } else {
            // Error response 401 and hasRefreshed is false:
            // Try to refresh the tokens for the first time
            this.auth.refreshSession().subscribe({
              next: refreshRes => {
                this.toastr.success(`Message: ${refreshRes.message}`, `Status: ${refreshRes.status}`);
                this.auth.setTokens(refreshRes.details.refreshToken, refreshRes.details.accessToken);

                // Retry original request with refreshed tokens
                this.executeWithAuthRetry(request, true).subscribe(observer);
              },
              error: refreshErr => {
                // Refreshing failed: logout and redirect
                const refreshMsg = refreshErr.error?.message || 'Could not refresh session';
                const refreshStatus = refreshErr.error?.status || refreshErr.status || 500;
                this.toastr.error(`Message: ${refreshMsg}`, `Status: ${refreshStatus}`);
                this.auth.logout();
                this.router.navigate(['/']);
                observer.error(refreshErr);
              }
            });
          }
        }
      });
    });
  }

  // Performs a DELETE request with automatic token refresh and error handling.
  // If the access token is expired, it will attempt to refresh it once.
  delete<T>(url: string): Observable<StandardResponse<T>> {
    const token = this.auth.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.executeWithAuthRetry(() =>
      this.http.delete<StandardResponse<T>>(url, { headers })
    );
  }

}

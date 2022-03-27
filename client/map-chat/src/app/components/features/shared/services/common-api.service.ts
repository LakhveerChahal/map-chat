import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlFormationService } from './url-formation.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonApiService {
    constructor(
        public urlFormationService: UrlFormationService,
        public http: HttpClient
    ) { }

    signUp(email: string, pwd: string): Observable<void> {
        return this.http.post<void>(this.urlFormationService.getSignupUrl(), { email, pwd }, { withCredentials: true });
    }

    signIn(email: string, pwd: string): Observable<void> {
        return this.http.post<void>(this.urlFormationService.getSigninUrl(), { email, pwd }, { withCredentials: true });
    }

    signOut(): Observable<void> {
        return this.http.get<void>(this.urlFormationService.getSignoutUrl(), { withCredentials: true });
    }
}
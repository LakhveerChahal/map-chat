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

    signUp(email: string, pwd: string): Observable<string> {
        return this.http.post<string>(this.urlFormationService.getSignupUrl(), { email, pwd }, { 
            withCredentials: true,
            responseType: 'text' as 'json'
        });
    }

    signIn(email: string, pwd: string): Observable<string> {
        return this.http.post<string>(this.urlFormationService.getSigninUrl(), { email, pwd }, { 
            withCredentials: true,
            responseType: 'text' as 'json'
        });
    }

    signOut(): Observable<void> {
        return this.http.get<void>(this.urlFormationService.getSignoutUrl(), { withCredentials: true });
    }
}
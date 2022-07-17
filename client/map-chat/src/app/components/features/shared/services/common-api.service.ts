import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlFormationService } from './url-formation.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class CommonApiService {
    constructor(
        public urlFormationService: UrlFormationService,
        public http: HttpClient
    ) { }

    signUp(email: string, pwd: string): Observable<{ token: string, _id: string }> {
        return this.http.post<{ token: string, _id: string }>(this.urlFormationService.getSignupUrl(), { email, pwd }, {
            withCredentials: true,
        });
    }

    signIn(email: string, pwd: string): Observable<{ token: string, _id: string, name: string, isOnline: boolean, lat: number, lng: number }> {
        return this.http.post<{ token: string, _id: string, name: string, isOnline: boolean, lat: number, lng: number }>(this.urlFormationService.getSigninUrl(), { email, pwd }, {
            withCredentials: true,
        });
    }

    signOut(): Observable<void> {
        return this.http.get<void>(this.urlFormationService.getSignoutUrl(), { withCredentials: true });
    }

    authenticateSession(): Observable<User> {
        return this.http.get<User>(this.urlFormationService.getAuthenticateUrl());
    }
}
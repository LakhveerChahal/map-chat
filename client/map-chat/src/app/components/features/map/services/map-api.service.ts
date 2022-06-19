import { Injectable } from '@angular/core';
import { UrlFormationService } from '@features/shared/services/url-formation.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@features/shared/models/user.model';
import { UserPreferenceService } from './user-preference.service';

@Injectable({
    providedIn: 'root'
})
export class MapApiService {

    constructor(
        public urlFormationService: UrlFormationService,
        public http: HttpClient,
        public userPreferenceService: UserPreferenceService
    ) { }

    getFriends(): Observable<User[]> {
        const authToken = this.userPreferenceService.getSessionToken();
        return this.http.get<User[]>(this.urlFormationService.getFriendsUrl(), {
            headers: {
                token: authToken
            }
        });
    }
}
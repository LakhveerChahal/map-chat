import { HttpClient } from '@angular/common/http';
import { UrlFormationService } from '@features/shared/services/url-formation.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@features/shared/models/user.model';
import { UserPreferenceService } from './user-preference.service';


@Injectable({
    providedIn: 'root'
})
export class FriendsApiService {
    constructor(
        public http: HttpClient,
        public urlFormationService: UrlFormationService,
        public userPreferenceService: UserPreferenceService
    ) {
    }

    sendFriendRequest(friendId: string): Observable<void> {
        return this.http.put<void>(this.urlFormationService.getPutFriendRequestUrl(friendId), {});
    }

    acceptFriendRequest(friendId: string): Observable<void> {
        return this.http.put<void>(this.urlFormationService.getPutAcceptFriendRequestUrl(friendId), {});
    }

    getFriends(state: string): Observable<User[]> {
        const authToken = this.userPreferenceService.getSessionToken();
        return this.http.get<User[]>(this.urlFormationService.getFriendsBaseUrl() + `/${state}`, {
            headers: {
                token: authToken
            }
        });
    }
}
import { HttpClient } from '@angular/common/http';
import { UrlFormationService } from '@features/shared/services/url-formation.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FriendsApiService {
    constructor(
        public http: HttpClient,
        public urlFormationService: UrlFormationService
    ) {
    }

    sendFriendRequest(friendId: string): Observable<void> {
        return this.http.put<void>(this.urlFormationService.getPutFriendRequestUrl(friendId), {});
    }
}
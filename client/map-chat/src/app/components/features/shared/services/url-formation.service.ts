import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { constants } from '@features/map/shared/constants';

@Injectable({
    providedIn: 'root'
})
export class UrlFormationService {
    baseUrl: string = environment.baseUrl;

    getAuthBaseUrl(): string {
        return `${this.baseUrl}/${constants.url.userUrl}`;
    }

    getFriendsBaseUrl(): string {
        return `${this.baseUrl}/${constants.url.friendsUrl}`;
    }

    getPeopleBaseUrl(): string {
        return `${this.baseUrl}/${constants.url.peopleUrl}`;
    }

    getSignupUrl(): string {
        return `${this.getAuthBaseUrl()}/${constants.url.signupUrl}`;
    }

    getSigninUrl(): string {
        return `${this.getAuthBaseUrl()}/${constants.url.signinUrl}`;
    }

    getSignoutUrl(): string {
        return `${this.getAuthBaseUrl()}/${constants.url.signoutUrl}`;
    }

    getPutFriendRequestUrl(friendId: string): string {
        return `${this.getFriendsBaseUrl()}/${constants.url.request}/${friendId}`;
    }

    getPutAcceptFriendRequestUrl(friendId: string): string {
        return `${this.getFriendsBaseUrl()}/${constants.url.acceptRequest}/${friendId}`;
    }

    getSearchedPeopleUrl(): string {
        return `${this.getPeopleBaseUrl()}/${constants.url.peopleSearch}`;
    }
}
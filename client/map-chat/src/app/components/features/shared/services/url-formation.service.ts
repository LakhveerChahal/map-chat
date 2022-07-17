import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { constants } from '@features/map/shared/constants';

@Injectable({
    providedIn: 'root'
})
export class UrlFormationService {
    baseUrl: string = environment.baseUrl;

    // Base Urls
    getAuthBaseUrl(): string {
        return `${this.baseUrl}/${constants.url.authUrl}`;
    }

    getFriendsBaseUrl(): string {
        return `${this.baseUrl}/${constants.url.friendsUrl}`;
    }

    getPeopleBaseUrl(): string {
        return `${this.baseUrl}/${constants.url.peopleUrl}`;
    }

    getChatBaseUrl(): string {
        return `${this.baseUrl}/${constants.url.chatUrl}`;
    }

    getUserBaseUrl(): string {
        return `${this.baseUrl}/${constants.url.userUrl}`;
    }
    // Base Urls End

    // Auth Urls
    getSignupUrl(): string {
        return `${this.getAuthBaseUrl()}/${constants.url.signupUrl}`;
    }

    getSigninUrl(): string {
        return `${this.getAuthBaseUrl()}/${constants.url.signinUrl}`;
    }

    getSignoutUrl(): string {
        return `${this.getAuthBaseUrl()}/${constants.url.signoutUrl}`;
    }

    getAuthenticateUrl(): string {
        return `${this.getAuthBaseUrl()}/${constants.url.authenticateUrl}`;
    }
    // Auth Urls End

    // Friend Urls
    getPutFriendRequestUrl(friendId: string): string {
        return `${this.getFriendsBaseUrl()}/${constants.url.request}/${friendId}`;
    }

    getPutAcceptFriendRequestUrl(friendId: string): string {
        return `${this.getFriendsBaseUrl()}/${constants.url.acceptRequest}/${friendId}`;
    }
    // Friend Urls End

    // People Urls
    getSearchedPeopleUrl(): string {
        return `${this.getPeopleBaseUrl()}/${constants.url.peopleSearch}`;
    }
    // People Urls End

    // Chat Urls
    getFriendChatUrl(friendId: string): string {
        return `${this.getChatBaseUrl()}/${friendId}`;
    }
    // Chat Urls End

    // User Urls
    getUpdateUserDataUrl(): string {
        return `${this.getUserBaseUrl()}`;
    }
}
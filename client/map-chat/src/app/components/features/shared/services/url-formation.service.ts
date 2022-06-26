import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { constants } from '@features/map/shared/constants';

@Injectable({
    providedIn: 'root'
})
export class UrlFormationService {
    baseUrl: string = environment.baseUrl;

    getSignupUrl(): string {
        return `${this.baseUrl}/${constants.url.userUrl}/${constants.url.signupUrl}`;
    }

    getSigninUrl(): string {
        return `${this.baseUrl}/${constants.url.userUrl}/${constants.url.signinUrl}`;
    }

    getSignoutUrl(): string {
        return `${this.baseUrl}/${constants.url.userUrl}/${constants.url.signoutUrl}`;
    }

    getFriendsUrl(): string {
        return `${this.baseUrl}/${constants.url.friendsUrl}`;
    }

    getSearchedPeopleUrl(): string {
        return `${this.baseUrl}/${constants.url.peopleUrl}/${constants.url.peopleSearch}`;
    }
}
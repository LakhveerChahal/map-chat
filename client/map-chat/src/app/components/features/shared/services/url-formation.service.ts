import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { constants } from '@features/map/shared/constants';

@Injectable({
    providedIn: 'root'
})
export class UrlFormationService {
    baseUrl: string = environment.baseUrl;

    getSignupUrl(): string {
        return `${this.baseUrl}/${constants.userUrl}/${constants.signupUrl}`;
    }

    getSigninUrl(): string {
        return `${this.baseUrl}/${constants.userUrl}/${constants.signinUrl}`;
    }

    getSignoutUrl(): string {
        return `${this.baseUrl}/${constants.userUrl}/${constants.signoutUrl}`;
    }

    getFriendsUrl(): string {
        return `${this.baseUrl}/${constants.friendsUrl}`;
    }
}
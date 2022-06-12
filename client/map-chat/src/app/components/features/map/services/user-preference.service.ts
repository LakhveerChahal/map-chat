import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserPreferenceService {

    constructor() {
    }

    setSessionToken(token: string): void {
        sessionStorage.setItem('session', token);
    }

    getSessionToken(): string | null {
        return sessionStorage.getItem('session');
    }
}
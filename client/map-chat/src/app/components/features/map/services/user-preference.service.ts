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

    getSessionToken(): string {
        const token = sessionStorage.getItem('session');
        return token != null ? token : '';
    }

    clearSessionToken(): void {
        sessionStorage.removeItem('session');
    }
}
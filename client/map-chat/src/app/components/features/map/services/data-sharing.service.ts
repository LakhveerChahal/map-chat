import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {
    private loggedInUser = new BehaviorSubject<User | null>(null);

    public getLoggedInUser(): BehaviorSubject<User | null> {
        return this.loggedInUser;
    }

    public setLoggedInUser(user: User | null): void {
        this.loggedInUser.next(user);
    }
}
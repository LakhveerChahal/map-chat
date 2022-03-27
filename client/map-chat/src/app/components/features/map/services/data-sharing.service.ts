import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {
    private loggedInUser = new BehaviorSubject<User>(new User('', '', '', ''));

    public getLoggedInUser(): BehaviorSubject<User> {
        return this.loggedInUser;
    }

    public setLoggedInUser(user: User): void {
        this.loggedInUser.next(user);
    }
}
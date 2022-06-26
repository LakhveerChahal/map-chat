import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {
    private loggedInUser = new BehaviorSubject<User | null>(null);
    private searchString = new ReplaySubject<string>(1);

    public getLoggedInUser(): BehaviorSubject<User | null> {
        return this.loggedInUser;
    }

    public setLoggedInUser(user: User | null): void {
        this.loggedInUser.next(user);
    }

    public getPeopleSearchString(): ReplaySubject<string> {
        return this.searchString;
    }

    public setPeopleSearchString(searchString: string): void {
        this.searchString.next(searchString);
    }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {
    private loggedInUser = new BehaviorSubject<User | null>(null);
    private searchString = new ReplaySubject<string>(1);
    private socket = new ReplaySubject<Socket>(1);
    private socketMap = new ReplaySubject<Map<string, string>>(1);

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

    public shareSocket(socket: Socket): void {
        this.socket.next(socket);
    }

    public getSocket(): ReplaySubject<Socket> {
        return this.socket;
    }

    public setSocketMap(socketMap: Map<string, string>): void {
        this.socketMap.next(socketMap);
    }

    public getSocketMap(): ReplaySubject<Map<string, string>> {
        return this.socketMap;
    }
}
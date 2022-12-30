import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {
    private loggedInUser = new BehaviorSubject<User | null>(null);
    private searchString = new ReplaySubject<string>(1);
    private socket = new ReplaySubject<Socket | null>(1);
    private socketMap = new ReplaySubject<Map<string, string>>(1);
    private reloadFriendList = new Subject<void>();
    private mapCenter = new Subject<User>();
    private reloadAvatar = new Subject<void>();

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

    public shareSocket(socket: Socket | null): void {
        this.socket.next(socket);
    }

    public getSocket(): ReplaySubject<Socket| null> {
        return this.socket;
    }

    public setSocketMap(socketMap: Map<string, string>): void {
        this.socketMap.next(socketMap);
    }

    public getSocketMap(): ReplaySubject<Map<string, string>> {
        return this.socketMap;
    }

    public setReloadFriendList(): void {
        this.reloadFriendList.next();
    }

    public getReloadFriendListEvent(): Subject<void> {
        return this.reloadFriendList;
    }

    public setMapCenter(user: User): void {
        this.mapCenter.next(user);
    }

    public getMapCenter(): Subject<User> {
        return this.mapCenter;
    }

    public getReloadAvatarEvent(): Subject<void> {
        return this.reloadAvatar;
    }

    public setReloadAvatarEvent(): void {
        this.reloadAvatar.next();
    }
}
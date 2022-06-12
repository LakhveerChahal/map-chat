import { Injectable } from '@angular/core';
import { UrlFormationService } from '@features/shared/services/url-formation.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@features/shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class MapApiService {

    constructor(
        public urlFormationService: UrlFormationService,
        public http: HttpClient

    ) { }

    getFriends(): Observable<User[]> {
        return this.http.get<User[]>(this.urlFormationService.getFriendsUrl());
    }
}
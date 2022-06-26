import { Injectable } from '@angular/core';
import { UrlFormationService } from '@features/shared/services/url-formation.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@features/shared/models/user.model';
import { UserPreferenceService } from './user-preference.service';
import { constants } from '../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class MapApiService {

    constructor(
        public urlFormationService: UrlFormationService,
        public http: HttpClient,
        public userPreferenceService: UserPreferenceService
    ) { }

    getFriends(): Observable<User[]> {
        const authToken = this.userPreferenceService.getSessionToken();
        return this.http.get<User[]>(this.urlFormationService.getFriendsUrl(), {
            headers: {
                token: authToken
            }
        });
    }

    getPeopleOnSearch(searchText: string, limit: number, offset: number): Observable<User[]> {
        let params = new HttpParams();
        params = params.append(constants.searchText, searchText);
        params = params.append(constants.limit, limit);
        params = params.append(constants.offset, offset);

        return this.http.get<User[]>(this.urlFormationService.getSearchedPeopleUrl(), {
            params
        });
    }
}
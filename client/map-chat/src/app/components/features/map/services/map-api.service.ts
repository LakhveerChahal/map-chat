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
        return this.http.get<User[]>(this.urlFormationService.getFriendsBaseUrl(), {
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

        const authToken = this.userPreferenceService.getSessionToken();
        return this.http.get<User[]>(this.urlFormationService.getSearchedPeopleUrl(), {
            headers: {
                token: authToken
            },
            params,
        });
    }

    updateUserLocationData(latitude: number, longitude: number): Observable<boolean> {
        latitude = latitude + Math.random();
        return this.http.post<boolean>(this.urlFormationService.getUpdateUserDataUrl(), {
            latitude, longitude
        });
    }
}
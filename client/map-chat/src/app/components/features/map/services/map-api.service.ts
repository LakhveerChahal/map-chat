import { Injectable } from '@angular/core';
import { UrlFormationService } from '@features/shared/services/url-formation.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserMetaData } from '@features/shared/models/user.model';
import { UserPreferenceService } from './user-preference.service';
import { BoundingBox } from '../models/bounding-box.model';
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

    // TODO: this should be bounding box constrained
    getFriends(boundingBox: BoundingBox): Observable<User[]> {
        let params = new HttpParams();
        params = params.append('minLat', boundingBox.minLat);
        params = params.append('maxLat', boundingBox.maxLat);
        params = params.append('minLng', boundingBox.minLng);
        params = params.append('maxLng', boundingBox.maxLng);

        return this.http.get<User[]>(this.urlFormationService.getActiveFriendsMarkers(), {
            params
        });
    }

    getPeopleOnSearch(searchText: string, limit: number, offset: number): Observable<User[]> {
        let params = new HttpParams();
        params = params.append(constants.searchText, searchText);
        params = params.append(constants.limit, limit);
        params = params.append(constants.offset, offset);

        return this.http.get<User[]>(this.urlFormationService.getSearchedPeopleUrl(), {
            params,
        });
    }

    updateUserLocationData(latitude: number, longitude: number): Observable<boolean> {
        latitude = latitude + Math.random();
        return this.http.post<boolean>(this.urlFormationService.getUpdateUserDataUrl(), {
            latitude, longitude
        });
    }

    getUserMetaDataById(): Observable<UserMetaData> {
        return this.http.get<UserMetaData>(this.urlFormationService.getUserMetaDataByIdUrl());
    }
}
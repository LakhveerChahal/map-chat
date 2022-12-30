import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { BaseMap } from '../../shared/base-map';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { MapApiService } from '@features/map/services/map-api.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { constants } from '../../shared/constants';
import { Marker } from '../../models/marker.model';
import { User } from '@features/shared/models/user.model';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {
  map: BaseMap | undefined;
  subscription = new Subscription();
  user: User | null = null;

  constructor(
    public mapApiService: MapApiService,
    public dataSharingService: DataSharingService,
    public viewContainerRef: ViewContainerRef,
    public supabaseService: SupabaseApiService
  ) { }

  ngOnInit(): void {
    this.map = new BaseMap({
      ...constants.defaultMapConfig,
      container: 'map', 
    }, this.viewContainerRef, this.supabaseService);

    this.registerMapListeners();

    this.subscription.add(this.dataSharingService.getLoggedInUser().subscribe((user: User | null) => {
      this.user = user;
      if(!this.user || !this.map) {
        this.removeAllMarkers();
        return;
      }

      this.map.panToUser(this.user);
      this.showMarkers();
    }));

    this.subscription.add(this.dataSharingService.getMapCenter().subscribe((user: User) => {
      if(!(user.lat && user.lng && this.map)) { return; }

      this.map.panToUser(user);
    }));
  }

  registerMapListeners(): void {
    if(!this.map) { return; }

    this.map.on('moveend', () => {
      this.showMarkers();
    });
  }

  showMarkers(): void {
    if(!this.map || !this.user) { return; }

    this.mapApiService.getFriends(this.map.getBoundingBox())
    .pipe(
      map((friends: User[]) => friends.map(f => new Marker(f._id, f.name, f.lat, f.lng, f.isOnline)))
    )
    .subscribe((markers: Marker[]) => {
      if(this.user == null) { return; }
      
      markers.push(new Marker(this.user._id, this.user.name, this.user.lat, this.user.lng, this.user.isOnline));
      this.map?.addUserMarkers(markers, this.user);
    });
  }

  removeAllMarkers(): void {
    this.map?.removeAllMarkers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

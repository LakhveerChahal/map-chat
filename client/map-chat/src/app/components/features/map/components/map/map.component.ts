import { Component, OnInit, OnDestroy } from '@angular/core';
import { constants } from '../../shared/constants';
import { BaseMap } from '../../shared/base-map';
import { Marker } from '../../models/marker.model';
import { of, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapApiService } from '@features/map/services/map-api.service';
import { User } from '@features/shared/models/user.model';
import { DataSharingService } from '@features/map/services/data-sharing.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnDestroy {
  map: BaseMap | undefined;
  subscription = new Subscription();
  
  constructor(
    public mapApiService: MapApiService,
    public dataSharingService: DataSharingService
  ) {
  }

  ngOnInit(): void {
    this.map = new BaseMap({
      ...constants.defaultMapConfig, 
      container: 'map'
    });

    this.subscription.add(this.dataSharingService.getLoggedInUser().subscribe((user: User | null) => {
      if(!user) {
        this.removeAllMarkers();
        return;
      }

      this.showMarkers();
    }));
  }

  showMarkers(): void {
    this.mapApiService.getFriends()
    .pipe(
      map((friends: User[]) => friends.map(f => new Marker(f.lat, f.lng, f.isOnline)))
    )
    .subscribe((markers: Marker[]) => {
      this.map?.addUserMarkers(markers);
    });
  }

  removeAllMarkers(): void {
    this.map?.removeAllMarkers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

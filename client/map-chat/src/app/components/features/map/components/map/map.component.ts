import { Component, OnInit } from '@angular/core';
import { constants } from '../../shared/constants';
import { BaseMap } from '../../shared/base-map';
import { Marker } from '../../models/marker.model';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapApiService } from '@features/map/services/map-api.service';
import { User } from '@features/shared/models/user.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  map: BaseMap | undefined;
  
  constructor(
    public mapApiService: MapApiService
  ) {
  }

  ngOnInit(): void {
    this.map = new BaseMap({
      ...constants.defaultMapConfig, 
      container: 'map'
    });
    this.showMarkers();
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

}

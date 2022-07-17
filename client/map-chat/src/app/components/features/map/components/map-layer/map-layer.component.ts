import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Subscription } from 'rxjs';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { UserGeolocationPosition } from '@features/map/models/location.model';
import { MapApiService } from '@features/map/services/map-api.service';
import { User } from '@features/shared/models/user.model';

@Component({
  selector: 'app-map-layer',
  templateUrl: './map-layer.component.html',
  styleUrls: ['./map-layer.component.less']
})
export class MapLayerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() loggedInUser: User | null = null;
  socket: Socket | null = null;
  subscription = new Subscription();

  constructor(
    public dataSharingService: DataSharingService, 
    public mapApiService: MapApiService
  ) { }
  
  
  ngOnInit(): void {
    this.subscription.add(
      this.dataSharingService.getSocket().subscribe((socket: Socket | null) => {
        this.socket = socket;
      })
    );

    this.updateUserLocationData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateUserLocationData();
  }

  updateUserLocationData(): void {
    if(!this.loggedInUser) { return; }

    if(!navigator.geolocation) { return; }

    navigator.geolocation.watchPosition(this.updateLocationCallback.bind(this), this.errorGettingLocationCallback.bind(this), {
      timeout: 30 * 1000,
      enableHighAccuracy: true
    });
  }

  updateLocationCallback(location: UserGeolocationPosition): void {
    console.log(this);
    
    this.mapApiService.updateUserLocationData(location.coords.latitude, location.coords.longitude).subscribe((res: boolean) => {});
  }

  errorGettingLocationCallback(ev: any): void {
    console.error(ev);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

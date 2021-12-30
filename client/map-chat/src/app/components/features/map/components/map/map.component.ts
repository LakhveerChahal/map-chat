import { Component, OnInit } from '@angular/core';
import { constants } from '../../shared/constants';
import { BaseMap } from '../../shared/base-map';
import { Marker } from '../../models/marker.model';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  map: BaseMap | undefined;
  
  constructor() {
  }

  ngOnInit(): void {
    this.map = new BaseMap({
      ...constants.defaultMapConfig, 
      container: 'map'
    });
    this.showMarkers();
  }

  showMarkers(): void {
    this.getDummyMarkersData().subscribe((markers: Marker[]) => {
      this.map?.addUserMarkers(markers);
    });
  }

  getDummyMarkersData(): Observable<Marker[]> {
    const mockData = [];
    for (let index = 0; index < 10; index++) {
      const rand = Math.random();
      const element = new Marker(40 + rand, -74.5 + rand, 70, 70, index % 2 == 0);
      mockData.push(element);
    }
    return of(mockData);
  }

}

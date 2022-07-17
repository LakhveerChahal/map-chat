import * as mapboxgl from 'mapbox-gl';
import { Marker } from '../models/marker.model';
import { UserMarkerLayer } from './user-marker-layer';
import { ViewContainerRef } from '@angular/core';
import { User } from '@features/shared/models/user.model';

export class BaseMap extends mapboxgl.Map {
    userMarkerLayer: UserMarkerLayer;

    constructor(mapOptions: mapboxgl.MapboxOptions, public viewContainerRef: ViewContainerRef) {
        super(mapOptions);
        this.userMarkerLayer = new UserMarkerLayer(viewContainerRef);
    }

    addUserMarkers(markers: Marker[], user: User): void {
        this.userMarkerLayer.removeAllMarkers();
        this.userMarkerLayer.addMarkers(markers, this, user);
    }

    removeAllMarkers(): void {
        this.userMarkerLayer.removeAllMarkers();
    }

    zoomToUser(user: User): void {
        if(!user.lat || !user.lng) { return; }

        this.setCenter({
            lat: user.lat,
            lng: user.lng
        });
    }
}
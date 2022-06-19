import * as mapboxgl from 'mapbox-gl';
import { Marker } from '../models/marker.model';
import { UserMarkerLayer } from './user-marker-layer';

export class BaseMap extends mapboxgl.Map {
    
    constructor(mapOptions: mapboxgl.MapboxOptions) {
        super(mapOptions);
    }

    addUserMarkers(markers: Marker[]): void {
        UserMarkerLayer.removeAllMarkers();
        UserMarkerLayer.addMarkers(markers, this);
    }

    removeAllMarkers(): void {
        UserMarkerLayer.removeAllMarkers();
    }
}
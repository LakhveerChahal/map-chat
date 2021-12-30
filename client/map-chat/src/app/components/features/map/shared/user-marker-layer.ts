import { Marker } from '../models/marker.model';
import { BaseMap } from './base-map';
import * as mapboxgl from 'mapbox-gl';

export class UserMarkerLayer {
    static markers: mapboxgl.Marker[] = [];

    public static removeAllMarkers(): void {
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];
    }

    public static addMarkers(markers: Marker[], map: BaseMap): void {
        for (let index = 0; index < markers.length; index++) {
            const marker = markers[index];
            const divEl = UserMarkerLayer.getMarkerElement(marker);
            this.markers.push(new mapboxgl.Marker(divEl).setLngLat({
                lat: marker.lat,
                lng: marker.lng
            }).addTo(map));
        }
    }

    public static getMarkerElement(marker: Marker): HTMLDivElement {
        const el = document.createElement('div');
        const width = marker.width;
        const height = marker.height;
        el.className = 'user-marker';
        el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
        const color = marker.isOnline ? 'green' : 'gray';
        el.style.boxShadow = `0 0 5px 5px ${color}`;

        return el;
    }

}
import { Marker } from '../models/marker.model';
import { BaseMap } from './base-map';
import * as mapboxgl from 'mapbox-gl';
import { Injectable, ViewContainerRef } from '@angular/core';
import { MarkerPopupComponent } from '../components/marker-popup/marker-popup.component';
import { User } from '@features/shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserMarkerLayer {
    markers: mapboxgl.Marker[] = [];

    constructor(private viewContainerRef: ViewContainerRef) {

    }

    public removeAllMarkers(): void {
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];
    }

    public addMarkers(markers: Marker[], map: BaseMap, user: User): void {
        for (let index = 0; index < markers.length; index++) {
            const marker = markers[index];
            const divEl = UserMarkerLayer.getMarkerElement(marker);
            this.markers.push(this.getMarkerInstance(divEl, marker, user).addTo(map));
        }
    }

    public getMarkerInstance(divEl: HTMLDivElement, marker: Marker, user: User): mapboxgl.Marker {
        const markerInstance = new mapboxgl.Marker(divEl)
            .setPopup(this.getPopUpInstance(marker, user))
            .setLngLat({
                lat: marker.lat,
                lng: marker.lng,
            });
        

        return markerInstance;
    }

    public getPopUpInstance(marker: Marker, user: User): mapboxgl.Popup {
        const popupComp = this.viewContainerRef.createComponent(MarkerPopupComponent);
        popupComp.instance.marker = marker;
        popupComp.instance.user = user;
        const popUp = new mapboxgl.Popup()
            .setLngLat({
                lat: marker.lat,
                lng: marker.lng
            })
            .setDOMContent(popupComp.location.nativeElement)
        
        return popUp;
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
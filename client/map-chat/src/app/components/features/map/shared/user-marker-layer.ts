import { Marker } from '../models/marker.model';
import { BaseMap } from './base-map';
import * as mapboxgl from 'mapbox-gl';
import { Injectable, ViewContainerRef } from '@angular/core';
import { MarkerPopupComponent } from '../components/marker-popup/marker-popup.component';
import { User } from '@features/shared/models/user.model';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';

@Injectable({
    providedIn: 'root'
})
export class UserMarkerLayer {
    markerMap: Map<string, mapboxgl.Marker> = new Map<string, mapboxgl.Marker>();
    static viewContainerRef: ViewContainerRef;
    static supabaseService: SupabaseApiService

    constructor(
        viewContainerRef: ViewContainerRef,
        supabaseService: SupabaseApiService
    ) {
        UserMarkerLayer.viewContainerRef = viewContainerRef;
        UserMarkerLayer.supabaseService = supabaseService;
    }

    public removeAllMarkers(): void {
        this.markerMap.forEach((marker) => marker.remove());
        this.markerMap = new Map();
    }

    public addAndRetainMarkers(markersToRetain: Marker[], map: BaseMap, user: User): void {
        const newMarkerMap = new Map<string, mapboxgl.Marker>();
        markersToRetain.forEach((marker: Marker) => {
            const foundMarker = this.markerMap.get(marker.id);
            if(foundMarker) {
                newMarkerMap.set(marker.id, foundMarker);
                this.markerMap.delete(marker.id);
            } else {
                const divEl = UserMarkerLayer.getMarkerElement(marker);
                newMarkerMap.set(marker.id, UserMarkerLayer.getMarkerInstance(divEl, marker, user).addTo(map));
            }
        });
        // after completion of forEach, remaining markers in markerMap are dangling markers, so remove them from map
        this.removeRemainingMarkersFromMap();

        this.markerMap = newMarkerMap;
    }

    removeRemainingMarkersFromMap(): void {
        this.markerMap.forEach((marker) => marker.remove());
    }

    public static getMarkerInstance(divEl: HTMLDivElement, marker: Marker, user: User): mapboxgl.Marker {
        const markerInstance = new mapboxgl.Marker(divEl)
            .setLngLat({
                lat: marker.lat,
                lng: marker.lng,
            });

        if(!UserMarkerLayer.isUserOwnMarker(marker, user)) { 
            // create chat popup for friend markers only
            markerInstance.setPopup(UserMarkerLayer.getPopUpInstance(marker, user));
        } else {
            
        }
        return markerInstance;
    }

    public static getPopUpInstance(marker: Marker, user: User): mapboxgl.Popup {
        const popupComp = UserMarkerLayer.viewContainerRef.createComponent(MarkerPopupComponent);
        popupComp.instance.marker = marker;
        popupComp.instance.user = user;
        const popUp = new mapboxgl.Popup()
            .setLngLat({
                lat: marker.lat,
                lng: marker.lng
            })
            .on('open', (event: any) => {
                const parentEl: HTMLDivElement = event.target._container.parentElement;
                
                const msgListEl: HTMLDivElement | null = parentEl.querySelector('.pop-up-wrapper>.msg-list');
                if(!msgListEl) { return; }

                msgListEl.scrollTo({
                    top: msgListEl.scrollHeight
                });
            })
            .setDOMContent(popupComp.location.nativeElement)
        
        return popUp;
    }

    public static isUserOwnMarker(marker: Marker, user: User): boolean {
        return marker.id === user._id;
    }

    public static getMarkerElement(marker: Marker): HTMLDivElement {
        const el = document.createElement('div');
        const width = marker.width;
        const height = marker.height;
        el.className = 'user-marker';
        const url = UserMarkerLayer.supabaseService.getPublicImageUrl(marker.id);
        el.style.backgroundImage = `url(${url})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';
        const color = marker.isOnline ? 'green' : 'gray';
        el.style.boxShadow = `0 0 5px 5px ${color}`;

        return el;
    }

}
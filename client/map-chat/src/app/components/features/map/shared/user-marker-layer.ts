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
    markers: mapboxgl.Marker[] = [];
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
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];
    }

    public addMarkers(markers: Marker[], map: BaseMap, user: User): void {
        for (let index = 0; index < markers.length; index++) {
            const marker = markers[index];
            const divEl = UserMarkerLayer.getMarkerElement(marker);
            this.markers.push(UserMarkerLayer.getMarkerInstance(divEl, marker, user).addTo(map));
        }
    }

    public static getMarkerInstance(divEl: HTMLDivElement, marker: Marker, user: User): mapboxgl.Marker {
        const markerInstance = new mapboxgl.Marker(divEl)
            .setLngLat({
                lat: marker.lat,
                lng: marker.lng,
            });

        if(!UserMarkerLayer.isUserOwnMarker(marker, user)) { 
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
import { NgModule } from "@angular/core";
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './components/map/map.component';
import { MapHeaderComponent } from './components/map-header/map-header.component';
import { SharedModule } from '@features/shared/shared.module';
import { SearchPeopleComponent } from './components/search-people/search-people.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MapLayerComponent } from './components/map-layer/map-layer.component';
import { MarkerPopupComponent } from './components/marker-popup/marker-popup.component';

@NgModule({
    declarations: [
        MapComponent,
        SearchPeopleComponent,
        MapHeaderComponent,
        SearchResultComponent,
        MapLayerComponent,
        MarkerPopupComponent,
    ],
    imports: [
        MapRoutingModule,
        SharedModule
    ]
})
export class MapModule { }
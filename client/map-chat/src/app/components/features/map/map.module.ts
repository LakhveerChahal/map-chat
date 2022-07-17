import { NgModule } from "@angular/core";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './components/map/map.component';
import { MapHeaderComponent } from './components/map-header/map-header.component';
import { SharedModule } from '@features/shared/shared.module';
import { SearchPeopleComponent } from './components/search-people/search-people.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MapLayerComponent } from './components/map-layer/map-layer.component';
import { MarkerPopupComponent } from './components/marker-popup/marker-popup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';

@NgModule({
    declarations: [
        MapComponent,
        SearchPeopleComponent,
        MapHeaderComponent,
        SearchResultComponent,
        MapLayerComponent,
        MarkerPopupComponent,
        UserProfileComponent,
        UserProfileViewComponent,
    ],
    imports: [
        MapRoutingModule,
        SharedModule,
        InfiniteScrollModule
    ]
})
export class MapModule { }
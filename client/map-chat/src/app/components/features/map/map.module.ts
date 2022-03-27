import { NgModule } from "@angular/core";
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './components/map/map.component';
import { SearchFriendsComponent } from './components/search-friends/search-friends.component';

@NgModule({
    declarations: [
        MapComponent,
        SearchFriendsComponent,
    ],
    imports: [
        MapRoutingModule
    ]
})
export class MapModule { }
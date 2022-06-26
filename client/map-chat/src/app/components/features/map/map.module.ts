import { NgModule } from "@angular/core";
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './components/map/map.component';
import { MapHeaderComponent } from './components/map-header/map-header.component';
import { SharedModule } from '@features/shared/shared.module';
import { SearchPeopleComponent } from './components/search-people/search-people.component';

@NgModule({
    declarations: [
        MapComponent,
        SearchPeopleComponent,
        MapHeaderComponent,
    ],
    imports: [
        MapRoutingModule,
        SharedModule
    ]
})
export class MapModule { }
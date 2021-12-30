import { NgModule } from "@angular/core";
import { MapComponent } from './map/map.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
    declarations: [
        MapComponent
    ],
    imports: [
        MapRoutingModule
    ]
})
export class MapModule { }
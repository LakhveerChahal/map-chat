import { NgModule } from "@angular/core";
import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './components/map/map.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
    declarations: [
        MapComponent,
        UserComponent,
    ],
    imports: [
        MapRoutingModule
    ]
})
export class MapModule { }
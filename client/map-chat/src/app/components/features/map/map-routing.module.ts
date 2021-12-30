import { Route, RouterModule } from "@angular/router";
import { MapComponent } from './components/map/map.component';
import { NgModule } from '@angular/core';

const routes: Route[] = [
    {
        path: '',
        component: MapComponent,
    },
    {
        path: '**',
        component: MapComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }
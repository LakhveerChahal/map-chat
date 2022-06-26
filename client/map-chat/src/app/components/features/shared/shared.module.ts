import { NgModule } from "@angular/core";
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        UserComponent,
        BrowserModule,
        FormsModule,
        HttpClientModule
    ]
})
export class SharedModule { }
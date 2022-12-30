import { NgModule } from "@angular/core";
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ItBtnDirective } from './directives/it-btn.directive';

@NgModule({
    declarations: [
        UserComponent,
        ItBtnDirective
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
        HttpClientModule,
        ItBtnDirective
    ]
})
export class SharedModule { }
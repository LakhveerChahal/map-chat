import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceService } from '@features/map/services/user-preference.service';

@Injectable({
    providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor{
    constructor(
        public userPreferenceService: UserPreferenceService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.userPreferenceService.getSessionToken();
        if(!token) {
            return next.handle(req);
        }
        
        const request = req.clone({
            setHeaders: {
                token
            }
        });
        return next.handle(request);
    }

}
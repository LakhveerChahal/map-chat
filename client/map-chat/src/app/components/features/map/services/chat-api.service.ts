import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlFormationService } from '@features/shared/services/url-formation.service';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  constructor(
    public urlFormationService: UrlFormationService,
    public http: HttpClient
  ) { }

  fetchChat(friendId: string, offset: number): Observable<Message[]> {
    let params = new HttpParams();
    params = params.append('offset', offset);
    return this.http.get<Message[]>(this.urlFormationService.getFriendChatUrl(friendId), { params });
  }
}

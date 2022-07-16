import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Marker } from '@features/map/models/marker.model';
import { Message } from '@features/map/models/message.model';
import { Subscription } from 'rxjs';
import { User } from '@features/shared/models/user.model';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { Socket } from 'socket.io-client';
import { ChatApiService } from '@features/map/services/chat-api.service';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.less']
})
export class MarkerPopupComponent implements OnInit, OnDestroy {
  @Input() marker: Marker | undefined;
  @Input() user: User | undefined;
  messages: Message[] = [];
  subscription = new Subscription();
  socket: Socket | null = null;
  socketMap = new Map<string, string>();

  constructor(
    public dataSharingService: DataSharingService,
    public chatApiService: ChatApiService
  ) {
    
  }

  ngOnInit(): void {
    this.subscription.add(
      this.dataSharingService.getSocket().subscribe((socket: Socket | null) => {
        this.socket = socket;
      })
    );

    this.subscription.add(
      this.dataSharingService.getSocketMap().subscribe((socketMap: Map<string, string>) => {
        this.socketMap = socketMap;
      })
    );
    this.registerSocketListeners();

    this.fetchChat();
  }

  fetchChat(): void {
    if(!this.marker || !this.user) { return; }

    const user2 = this.marker.id;
    const offset = this.messages.length;

    this.chatApiService.fetchChat(user2, offset).subscribe((msgs: Message[]) => {
      this.messages.splice(0, 0, ...msgs);
    });
  }

  onSubmit(newMsgRef: HTMLInputElement, msgList: HTMLDivElement): void {
    this.sendMessage(newMsgRef, msgList);
    newMsgRef.value = '';
  }

  registerSocketListeners(): void {
    if(!this.socket) { return; }

    this.socket.on('pvt msg', ({ content, from }) => {
      if(this.marker && this.marker.id == from) {
        this.messages.push(new Message(content, from));
      }
    });
  }

  sendMessage(newMsgRef: HTMLInputElement, msgList: HTMLDivElement): void {
    const newMsgText: string | undefined = newMsgRef.value;

    if(this.user == null || newMsgText == undefined || this.marker == undefined) { return; }
    this.messages.push(new Message(newMsgText, this.user._id));

    this.socket?.emit('pvt msg', {
      content: newMsgText,
      to: this.marker.id
    });
    this.scrollToBottom(msgList);
  }

  onScroll(): void {
    this.fetchChat();
  }

  scrollToBottom(element: HTMLDivElement): void {
    setTimeout(() => {
      const scrollHeight = element.scrollHeight;
      element.scrollTo({
        top: scrollHeight
      });
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

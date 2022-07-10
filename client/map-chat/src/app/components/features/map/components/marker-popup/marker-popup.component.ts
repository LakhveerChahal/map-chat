import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Marker } from '@features/map/models/marker.model';
import { Message } from '@features/map/models/message.model';
import { Subscription } from 'rxjs';
import { User } from '@features/shared/models/user.model';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { Socket } from 'socket.io-client';

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
  socket: Socket | undefined;
  socketMap = new Map<string, string>();

  constructor(
    public dataSharingService: DataSharingService
  ) {
    
  }

  
  ngOnInit(): void {
    this.subscription.add(
      this.dataSharingService.getSocket().subscribe((socket: Socket) => {
        this.socket = socket;
      })
    );

    this.subscription.add(
      this.dataSharingService.getSocketMap().subscribe((socketMap: Map<string, string>) => {
        this.socketMap = socketMap;
      })
    );
    this.registerSocketListeners();
  }

  onSubmit(newMsgRef: HTMLInputElement): void {
    this.sendMessage(newMsgRef);
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

  sendMessage(newMsgRef: HTMLInputElement): void {
    const newMsgText: string | undefined = newMsgRef.value;

    if(this.user == null || newMsgText == undefined || this.marker == undefined) { return; }
    this.messages.push(new Message(newMsgText, this.user._id));

    this.socket?.emit('pvt msg', {
      content: newMsgText,
      to: this.marker.id
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

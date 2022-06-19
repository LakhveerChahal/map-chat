import { Component, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { User } from '@features/shared/models/user.model';
import { CommonApiService } from '@features/shared/services/common-api.service';
import { UserPreferenceService } from '@features/map/services/user-preference.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  showSignIn: boolean = true;
  showSignInDialog: boolean = false;
  chat: string[] = [];
  msg: string = '';
  socket: Socket | any;

  constructor(
    public dataSharingService: DataSharingService,
    public commonApiService: CommonApiService,
    public userPreferenceService: UserPreferenceService
  ) { }

  establishSocket(): void {
    this.socket = io('http://localhost:3000', {
      reconnectionAttempts: 0,
      auth: {
        token: this.userPreferenceService.getSessionToken()
      },
      path: ''
    });
    this.registerListeners();
  }

  onSubmit(): void {
    console.log(this.msg);
    
    this.socket.emit('msg', this.msg);
    this.msg = '';
  }

  registerListeners(): void {
    this.socket.on('connect', () => {
      console.log('CONNECT: ' + this.socket.id);
    });

    this.socket.on('connect_error', () => {
      console.error('error occured in socket');
    })

    this.socket.on('disconnect', () => {
      console.log(this.socket.id);
    })

    this.socket.on('broadcast-msg', (data: string) => {
      console.log('DATA: ' + data);
      this.chat.push(data);
    })

  }

  disconnectSocket(): void {
    this.socket.disconnect();
  }

  toggleSignIn(): void {
    if(!this.showSignIn) {
      this.userPreferenceService.clearSessionToken();
      this.disconnectSocket();
      this.dataSharingService.setLoggedInUser(null);
      this.showSignIn = true;
    } else {
      this.showSignInDialog = true;
    }
  }

  userLoginEvent(loggedInUser: User): void {
    if(!loggedInUser) {
      this.disconnectSocket();
      return; 
    }

    this.establishSocket();
    this.showSignInDialog = false;
    this.showSignIn = false;
  }

  ngOnDestroy(): void {
    this.disconnectSocket();
  }
}

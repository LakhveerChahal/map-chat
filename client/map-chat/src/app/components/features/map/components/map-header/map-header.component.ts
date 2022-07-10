import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { CommonApiService } from '@features/shared/services/common-api.service';
import { UserPreferenceService } from '@features/map/services/user-preference.service';
import { User } from '@features/shared/models/user.model';


@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  styleUrls: ['./map-header.component.less']
})
export class MapHeaderComponent implements OnInit, OnDestroy {
  showSignIn: boolean = true;
  showSignInDialog: boolean = false;
  socket: Socket | undefined;

  constructor(
    public dataSharingService: DataSharingService,
    public commonApiService: CommonApiService,
    public userPreferenceService: UserPreferenceService
  ) { }

  ngOnInit(): void {
  }


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


  registerListeners(): void {
    if(!this.socket) { return; }

    this.socket.on('connect', () => {
      if(!this.socket) { return; }

      this.dataSharingService.shareSocket(this.socket);
    });

    this.socket.on('connect_error', () => {
      console.error('error occured in socket');
    })

    this.socket.on('disconnect', () => {
    })

    this.socket.on('users', (socketMapArray: any[]) => {
      const socketMap = new Map<string, string>(socketMapArray);
      this.dataSharingService.setSocketMap(socketMap);
    })
  }

  disconnectSocket(): void {
    if(!this.socket) { return; }

    this.socket.disconnect();
  }

  toggleSignIn(): void {
    if (!this.showSignIn) {
      this.userPreferenceService.clearSessionToken();
      this.disconnectSocket();
      this.dataSharingService.setLoggedInUser(null);
      this.showSignIn = true;
    } else {
      this.showSignInDialog = true;
    }
  }

  userLoginEvent(loggedInUser: User): void {
    if (!loggedInUser) {
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { CommonApiService } from '@features/shared/services/common-api.service';
import { UserPreferenceService } from '@features/map/services/user-preference.service';
import { User } from '@features/shared/models/user.model';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  styleUrls: ['./map-header.component.less']
})
export class MapHeaderComponent implements OnInit, OnDestroy {
  showSignIn: boolean = true;
  showSignInDialog: boolean = false;
  socket: Socket | null = null;
  loggedInUser: User | null = null;
  subscription = new Subscription();

  constructor(
    public dataSharingService: DataSharingService,
    public commonApiService: CommonApiService,
    public userPreferenceService: UserPreferenceService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.dataSharingService.getLoggedInUser().subscribe((user: User | null) => {
        this.userLoginEvent(user);
      })
    );
  }


  establishSocket(): void {
    // socket already exists
    if(this.socket) { return; }

    this.socket = io(environment.baseUrl, {
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

      this.removeCustomListeners(this.socket);
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

    this.removeCustomListeners(this.socket);
    this.socket.disconnect();
    this.socket = null;
    
    this.dataSharingService.shareSocket(this.socket);
  }

  toggleSignIn(): void {
    if (!this.showSignIn) {
      // Signing Out...
      this.commonApiService.signOut().subscribe(() => {
        this.userPreferenceService.clearSessionToken();
      });
      this.disconnectSocket();
      this.dataSharingService.setLoggedInUser(null);
      this.showSignIn = true;
    } else {
      this.showSignInDialog = true;
    }
  }

  // can get called from datashareingservice and Output event at the same time
  userLoginEvent(loggedInUser: User | null): void {
    this.loggedInUser = loggedInUser;
    if (!loggedInUser) {
      this.disconnectSocket();
      return;
    }

    this.establishSocket();
    this.showSignInDialog = false;
    this.showSignIn = false;
  }

  removeCustomListeners(socket: Socket): void {
    socket.removeListener('pvt msg');
  }

  ngOnDestroy(): void {
    this.commonApiService.signOut().subscribe(() => {
      this.userPreferenceService.clearSessionToken();
    });
    this.disconnectSocket();
  }
}

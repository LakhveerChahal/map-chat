import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';
import { Subscription } from 'rxjs';
import { User, UserMetaData } from '@features/shared/models/user.model';
import { MapApiService } from '@features/map/services/map-api.service';
import { FriendsApiService } from '@features/map/services/friends-api.service';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { constants } from '@features/map/shared/constants';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.less']
})
export class UserProfileViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: User | null = null;
  friends: User[] = [];
  friendRequests: User[] = [];
  sentFriendRequests: User[] = [];
  userMetadata: UserMetaData | null = null;
  subscription = new Subscription();

  constructor(
    public supabase: SupabaseApiService, // used in template
    public mapApiService: MapApiService,
    public friendsApiService: FriendsApiService,
    public dataSharingService: DataSharingService
  ) {

  }

  ngOnInit(): void {
    this.subscription.add(this.dataSharingService.getReloadFriendListEvent().subscribe((state: string) => {
      switch (state) {
        case constants.active:
          this.getFriendsList(state);
          break;
        case constants.sent:
          this.getFriendsList(state);
        break;
        default:
          break;
      }
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.getUserMetaDataById();
      this.getFriendsList(constants.active);
      this.getFriendsList(constants.received);
      this.getFriendsList(constants.sent);
    }
  }

  getUserMetaDataById(): void {
    this.mapApiService.getUserMetaDataById().subscribe((res: UserMetaData) => {
      this.userMetadata = res;
    });
  }

  getFriendsList(state: string): void {
    // can be paginated in future
    this.friendsApiService.getFriends(state).subscribe((friends: User[]) => {
      switch (state) {
        case constants.active:
          this.friends = friends;
          break;
        case constants.received:
          this.friendRequests = friends;
          break;
        case constants.sent:
          this.sentFriendRequests = friends
          break;
        default:
          break;
      }
    });
  }

  goToUserLocation(user: User): void {
    this.dataSharingService.setMapCenter(user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

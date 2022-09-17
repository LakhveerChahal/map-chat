import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';
import { Subscription } from 'rxjs';
import { User, UserMetaData } from '@features/shared/models/user.model';
import { MapApiService } from '@features/map/services/map-api.service';
import { FriendsApiService } from '@features/map/services/friends-api.service';
import { DataSharingService } from '@features/map/services/data-sharing.service';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.less']
})
export class UserProfileViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: User | null = null;
  friends: User[] = [];
  subscription = new Subscription();

  constructor(
    public supabase: SupabaseApiService, // used in template
    public mapApiService: MapApiService,
    public friendsApiService: FriendsApiService,
    public dataSharingService: DataSharingService
  ) {

  }

  ngOnInit(): void {
    this.subscription.add(this.dataSharingService.getReloadFriendListEvent().subscribe(() => {
      this.getFriendsList();
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.getUserMetaDataById();
      this.getFriendsList();
    }
  }

  getUserMetaDataById(): void {
    this.mapApiService.getUserMetaDataById().subscribe((res: UserMetaData) => {
      console.log(res);
      
    });
  }

  getFriendsList(): void {
    // can be paginated in future
    this.friendsApiService.getFriends().subscribe((friends: User[]) => {
      this.friends = friends;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

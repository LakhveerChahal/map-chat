import { Component, Input } from '@angular/core';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { constants } from '@features/map/shared/constants';
import { User, UserMetaData } from '@features/shared/models/user.model';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';

@Component({
  selector: 'app-friends-info',
  templateUrl: './friends-info.component.html',
  styleUrls: ['./friends-info.component.less']
})
export class FriendsInfoComponent {
  constants = constants;
  tabState: string = constants.active;
  @Input() userMetadata: UserMetaData | null = null;
  @Input() friends: User[] = [];
  @Input() friendRequests: User[] = [];
  @Input() sentFriendRequests: User[] = [];

  constructor(
    public supabase: SupabaseApiService, // used in template
    public dataSharingService: DataSharingService
  ) { }

  goToUserLocation(user: User): void {
    this.dataSharingService.setMapCenter(user);
  }
}

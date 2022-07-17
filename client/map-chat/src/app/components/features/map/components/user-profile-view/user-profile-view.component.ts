import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User, UserMetaData } from '@features/shared/models/user.model';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';
import { MapApiService } from '@features/map/services/map-api.service';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.less']
})
export class UserProfileViewComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  constructor(
    public supabase: SupabaseApiService,
    public mapApiService: MapApiService
  ) {

  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.user.img = this.supabase.getPublicImageUrl(this.user._id);
      this.getUserMetaDataById();
    }
  }

  getUserMetaDataById(): void {
    this.mapApiService.getUserMetaDataById().subscribe((res: UserMetaData) => {
      console.log(res);
      
    });
  }

}

import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';
import { User } from '@features/shared/models/user.model';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit, OnChanges, OnDestroy {
  @Input() loggedInUser: User | null = null;
  avatarUrl: string = '';
  subscription = new Subscription();


  constructor(
    public supabase: SupabaseApiService, // used in template
    public dataSharingService: DataSharingService
  ) { }
  
  ngOnInit(): void {
    this.subscription.add(this.dataSharingService.getReloadAvatarEvent().subscribe(() => {
      this.setAvatarUrl();
    }));
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.loggedInUser) {
      this.setAvatarUrl();
    }
  }

  setAvatarUrl(): void {
    this.avatarUrl = '';
    setTimeout(() => {
      if (!this.loggedInUser) { return; }

      this.avatarUrl = this.supabase.getPublicImageUrl(this.loggedInUser._id);
    }, 1000);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

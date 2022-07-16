import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserPreferenceService } from '@features/map/services/user-preference.service';
import { CommonApiService } from '@features/shared/services/common-api.service';
import { User } from '@features/shared/models/user.model';
import { DataSharingService } from '@features/map/services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    public userPreferenceService: UserPreferenceService,
    public commonApiService: CommonApiService,
    public dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    const sessionToken = this.userPreferenceService.getSessionToken();
    if(sessionToken != '') {
      this.commonApiService.authenticateSession().subscribe((user: User) => {
        if(user) {
          this.dataSharingService.setLoggedInUser(user);
        }
      }, (err) => {
        this.userPreferenceService.clearSessionToken();
        this.dataSharingService.setLoggedInUser(null);
      });
    }
  }

  ngOnDestroy(): void {
  }
}

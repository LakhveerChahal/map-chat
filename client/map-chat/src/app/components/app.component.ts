import { Component } from '@angular/core';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { User } from '@features/shared/models/user.model';
import { CommonApiService } from '@features/shared/services/common-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  showSignIn: boolean = true;
  showSignInDialog: boolean = false;

  constructor(
    public dataSharingService: DataSharingService,
    public commonApiService: CommonApiService
  ) { }

  toggleSignIn(): void {
    if(!this.showSignIn) {
      this.commonApiService.signOut().subscribe(() => {
        this.showSignIn = true;
      });
    } else {
      this.showSignInDialog = true;
    }
  }

  userLoginEvent(loggedInUser: User): void {
    if(!loggedInUser) { return; }

    this.showSignInDialog = false;
    this.showSignIn = false;
  }

}

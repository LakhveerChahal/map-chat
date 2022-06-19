import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonApiService } from '@features/shared/services/common-api.service';
import { User } from '@features/shared/models/user.model';
import { UserPreferenceService } from '@features/map/services/user-preference.service';
import { DataSharingService } from '@features/map/services/data-sharing.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  signInForm: boolean = true;
  signinEmail: string = '';
  signinPwd: string = '';

  signupEmail: string = '';
  signupPwd: string = '';

  @Output('userLoginEvent') userLoginEvent = new EventEmitter<User>();

  constructor(
    public commonApiService: CommonApiService,
    public userPreferenceService: UserPreferenceService,
    public dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
  }

  onSignIn(): void {
    this.commonApiService.signIn(this.signinEmail, this.signinPwd).subscribe((token: string) => {
      this.shareUser(token);
    });
  }

  onSignUp(): void {
    this.commonApiService.signUp(this.signupEmail, this.signupPwd).subscribe((token: string) => {
      this.shareUser(token);
    });
  }

  shareUser(token: string): void {
    this.userPreferenceService.setSessionToken(token);
    const user = new User('', this.signinEmail, this.signinEmail, '', 0, 0, true);
    this.userLoginEvent.emit(user);
    this.dataSharingService.setLoggedInUser(user);
  }

  toggleForm(): void {
    this.signInForm = !this.signInForm;
  }

}

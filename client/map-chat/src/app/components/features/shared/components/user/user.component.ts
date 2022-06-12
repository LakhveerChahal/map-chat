import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonApiService } from '@features/shared/services/common-api.service';
import { User } from '@features/shared/models/user.model';
import { UserPreferenceService } from '@features/map/services/user-preference.service';

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
    public userPreferenceService: UserPreferenceService
  ) { }

  ngOnInit(): void {
  }

  onSignIn(): void {
    this.commonApiService.signIn(this.signinEmail, this.signinPwd).subscribe((token: string) => {
      this.userPreferenceService.setSessionToken(token);
      this.userLoginEvent.emit(new User('', this.signinEmail, this.signinEmail, '', 0, 0, true));
    });
  }

  onSignUp(): void {
    this.commonApiService.signUp(this.signupEmail, this.signupPwd).subscribe((token: string) => {
      this.userPreferenceService.setSessionToken(token);
      this.userLoginEvent.emit(new User('', this.signinEmail, this.signinEmail, '', 0, 0, true));
    });
  }

  toggleForm(): void {
    this.signInForm = !this.signInForm;
  }

}

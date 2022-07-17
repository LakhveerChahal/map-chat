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

  @Output('closePanelEmitter') closePanelEmitter = new EventEmitter<void>();
  @Output('userLoginEvent') userLoginEvent = new EventEmitter<User>();

  constructor(
    public commonApiService: CommonApiService,
    public userPreferenceService: UserPreferenceService,
    public dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
  }

  onSignIn(): void {
    this.commonApiService.signIn(this.signinEmail, this.signinPwd).subscribe((res: { token: string, _id: string, name: string, isOnline: boolean, lat: number, lng: number }) => {
      this.shareUser(res.token, res._id, res.name, res.isOnline, res.lat, res.lng);
    });
  }

  onSignUp(): void {
    this.commonApiService.signUp(this.signupEmail, this.signupPwd).subscribe((res: { token: string, _id: string }) => {
      this.shareUser(res.token, res._id, res._id, false, 0, 0);
    });
  }

  shareUser(token: string, id: string, name: string, isOnline: boolean, lat: number, lng: number): void {
    this.userPreferenceService.setSessionToken(token);
    const user = new User(id, this.signinEmail, name, '', lat, lng, isOnline, false, false, false);
    this.userLoginEvent.emit(user);
    this.dataSharingService.setLoggedInUser(user);
    this.dataSharingService.setPeopleSearchString('');
  }

  toggleForm(): void {
    this.signInForm = !this.signInForm;
  }

  closePanel(): void {
    this.closePanelEmitter.emit();
  }

}

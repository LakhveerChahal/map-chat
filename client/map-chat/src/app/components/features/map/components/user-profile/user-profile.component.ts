import { Component, OnInit, Input } from '@angular/core';
import { User } from '@features/shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  @Input() loggedInUser: User | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}

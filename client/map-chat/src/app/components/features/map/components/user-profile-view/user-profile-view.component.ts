import { Component, OnInit, Input } from '@angular/core';
import { User } from '@features/shared/models/user.model';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.less']
})
export class UserProfileViewComponent implements OnInit {
  @Input() user: User | null = null;
  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
    
  }

}

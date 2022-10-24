import { Component, OnInit, Input } from '@angular/core';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';
import { User } from '@features/shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  @Input() loggedInUser: User | null = null;

  constructor(
    public supabase: SupabaseApiService, // used in template
  ) { }

  ngOnInit(): void {
  }

}

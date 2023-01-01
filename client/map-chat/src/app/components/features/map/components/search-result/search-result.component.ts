import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { Subscription, Subject } from 'rxjs';
import { User } from '@features/shared/models/user.model';
import { MapApiService } from '@features/map/services/map-api.service';
import { constants } from '@features/map/shared/constants';
import { takeUntil } from 'rxjs/operators';
import { FriendsApiService } from '@features/map/services/friends-api.service';
import { SupabaseApiService } from '@features/shared/services/supabase-api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  peopleList: User[] = [];
  limit: number = constants.defaultLimit;
  offset: number = 0;
  newSearchEmitter = new Subject<void>();
  loggedInUser: User | null = null;

  subscription = new Subscription();

  constructor(
    public dataSharingService: DataSharingService,
    public mapApiService: MapApiService,
    public friendsApiService: FriendsApiService,
    public supabase: SupabaseApiService
  ) { }

  ngOnInit(): void {
    this.registerSubscriptions();
  }

  registerSubscriptions(): void {
    this.subscription.add(
      this.dataSharingService.getLoggedInUser().subscribe((user: User | null) => {
        this.loggedInUser = user;
      })
    );

    this.subscription.add(
      this.dataSharingService.getUserProfilePanelEvent().subscribe((showPanel: boolean) => {
        this.searchPeople('');
      })
    );

    this.subscription.add(
      this.dataSharingService.getPeopleSearchString().subscribe((searchString: string) => {
        this.newSearchEmitter.next();
        this.searchPeople(searchString);
      })
    );
  }

  searchPeople(searchString: string): void {
    if (searchString == '') {
      this.peopleList = [];
      return;
    }

    this.mapApiService.getPeopleOnSearch(searchString, this.limit, this.offset)
      .pipe(takeUntil(this.newSearchEmitter))
      .subscribe((people: User[]) => {
        this.peopleList = people;
      });
  }

  // World is too small
  sendFriendRequest(person: User): void {
    this.friendsApiService.sendFriendRequest(person._id).subscribe(() => {
      person.friendReqSent = true;
      this.dataSharingService.setReloadFriendList();
    });
  }

  // YAY!
  acceptFriendRequest(person: User): void {
    this.friendsApiService.acceptFriendRequest(person._id).subscribe(() => {
      person.isFriend = true;
      person.friendReqReceived = false;
      this.dataSharingService.setReloadFriendList();
    });
  }

  // bad thing to do honestly :)
  undoFriendRequest(person: User): void {
    this.friendsApiService.undoFriendRequest(person._id).subscribe(() => {
      person.isFriend = false;
      person.friendReqSent = false;
      this.dataSharingService.setReloadFriendList();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

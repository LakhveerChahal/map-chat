import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSharingService } from '@features/map/services/data-sharing.service';
import { Subscription, Subject } from 'rxjs';
import { User } from '@features/shared/models/user.model';
import { MapApiService } from '@features/map/services/map-api.service';
import { constants } from '@features/map/shared/constants';
import { takeUntil } from 'rxjs/operators';

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
        console.log(people);
        this.peopleList = people;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
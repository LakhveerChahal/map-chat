import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { constants } from '@features/map/shared/constants';
import { MapApiService } from '@features/map/services/map-api.service';
import { User } from '@features/shared/models/user.model';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.less']
})
export class SearchPeopleComponent implements OnInit, AfterViewInit {
  @ViewChild('peopleSearch') peopleSearchInput: ElementRef<HTMLInputElement> | undefined;
  searchEmitter: Subject<string> = new Subject<string>();
  limit: number = constants.defaultLimit;
  offset: number = 0;
  peopleList: User[] = [];

  constructor(
    public mapApiService: MapApiService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.registerListeners();
  }

  registerListeners(): void {
    if(!this.peopleSearchInput) { return; }

    this.searchEmitter
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((searchString: string) => {
      this.searchPeople(searchString);
    });

    this.peopleSearchInput.nativeElement.onkeyup = () => {
      const searchValue = this.peopleSearchInput?.nativeElement.value;
      console.log(searchValue);
      this.searchEmitter.next(searchValue);
    };
  }

  searchPeople(searchString: string): void {
    if(searchString == '') {
      this.peopleList = [];
      return;
    }

    this.mapApiService.getPeopleOnSearch(searchString, this.limit, this.offset)
    .pipe(takeUntil(this.searchEmitter))
    .subscribe((people: User[]) => {
      console.log(people);
      this.peopleList = people;
    });
  }

}

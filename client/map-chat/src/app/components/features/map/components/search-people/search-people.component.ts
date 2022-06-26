import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { constants } from '@features/map/shared/constants';
import { MapApiService } from '@features/map/services/map-api.service';
import { User } from '@features/shared/models/user.model';
import { DataSharingService } from '@features/map/services/data-sharing.service';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.less']
})
export class SearchPeopleComponent implements OnInit, AfterViewInit {
  @ViewChild('peopleSearch') peopleSearchInput: ElementRef<HTMLInputElement> | undefined;
  searchEmitter: Subject<string> = new Subject<string>();

  constructor(
    public dataSharingService: DataSharingService,
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
      this.dataSharingService.setPeopleSearchString(searchString);
    });

    this.peopleSearchInput.nativeElement.onkeyup = () => {
      const searchValue = this.peopleSearchInput?.nativeElement.value;
      console.log(searchValue);
      this.searchEmitter.next(searchValue);
    };
  }
}

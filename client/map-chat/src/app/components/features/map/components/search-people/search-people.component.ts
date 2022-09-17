import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
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
export class SearchPeopleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('peopleSearch') peopleSearchInput: ElementRef<HTMLInputElement> | undefined;
  searchEmitter: Subject<string> = new Subject<string>();

  subscription = new Subscription();

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

    this.subscription.add(
      this.searchEmitter
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchString: string) => {
        this.dataSharingService.setPeopleSearchString(searchString);
      })
    );

    this.peopleSearchInput.nativeElement.onkeyup = () => {
      const searchValue = this.peopleSearchInput?.nativeElement.value;
      searchValue && this.searchEmitter.next(searchValue);
    };

    this.subscription.add(
      this.dataSharingService.getPeopleSearchString().subscribe((searchString: string) => {
        const searchValue = this.peopleSearchInput?.nativeElement.value;

        if(searchString == '' && searchValue != '') {
          this.clearSearch();
        }
      })
    );
  }

  clearSearch(): void {
    if(this.peopleSearchInput) {
      this.peopleSearchInput.nativeElement.value = '';
    }
    this.searchEmitter.next('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

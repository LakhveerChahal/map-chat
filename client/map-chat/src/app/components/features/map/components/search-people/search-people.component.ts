import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
      const searchValue: string = this.peopleSearchInput?.nativeElement.value || '';
      this.searchEmitter.next(searchValue);
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

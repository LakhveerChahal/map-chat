import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsInfoComponent } from './friends-info.component';

describe('FriendsInfoComponent', () => {
  let component: FriendsInfoComponent;
  let fixture: ComponentFixture<FriendsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

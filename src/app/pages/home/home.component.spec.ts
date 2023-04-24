import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import {
  DateRange,
  MatCalendar,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HomeService } from './home.service';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, tap } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let service: HomeService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  let calendarComponent: MatCalendar<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgxSkeletonLoaderModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        FormsModule,
        HttpClientModule,
        MatExpansionModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatChipsModule,
        MatRadioModule,
      ],
      providers: [
        MatDatepickerModule,
        HomeService,
        {
          provide: HomeService,
          useValue: {
            getTransactionDetails: () => {
              return {};
            },
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HomeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showDetailedPage method', () => {
    let router = fixture.debugElement.injector.get(Router);
    component.showDetailedPage('click', { obj: 1 });

    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/details');
  });

  it('should call selected Changes which has only start date', () => {
    component.getTransaction = jasmine.createSpy();
    component.selectedChange(new Date('2023/04/24'));

    fixture.detectChanges();

    expect(component.getTransaction).toHaveBeenCalledWith({
      startDate: '2023-04-24',
      endDate: '',
    });
  });

  it('should call selected Changes which has only start date and end date', () => {
    component.selectedMode = 'Range';
    component.selectedRangeValue = new DateRange<Date>(
      new Date('2022-01-01'),
      null
    );
    fixture.detectChanges();

    component.getTransaction = jasmine.createSpy();
    component.selectedChange(new Date('2022-01-31'));

    expect(component.getTransaction).toHaveBeenCalledWith({
      startDate: '2022-01-01',
      endDate: '2022-01-31',
    });
  });

  it('should call selected Changes which has switched start date and end date', () => {
    component.selectedMode = 'Range';
    component.selectedRangeValue = new DateRange<Date>(
      new Date('2022-01-31'),
      null
    );
    fixture.detectChanges();

    component.getTransaction = jasmine.createSpy();
    component.selectedChange(new Date('2022-01-01'));

    expect(component.getTransaction).toHaveBeenCalledWith({
      startDate: '2022-01-01',
      endDate: '2022-01-31',
    });
  });

  it('should call Radio selected Changes', () => {
    const eventValue = {
      value: 'All',
    };

    component.getTransaction = jasmine.createSpy();
    component.radioChange(eventValue);
    fixture.detectChanges();

    expect(component.getTransaction).toHaveBeenCalledWith({
      startDate: '',
      endDate: '',
    });
  });

  it('should call compareDate in desc order', () => {
    const data = [
      {
        id: 2,
      },
      {
        id: 6,
      },
      {
        id: 1,
      },
    ];

    const result = data.sort((component as any).compareDate);

    expect(result).toEqual([
      {
        id: 6,
      },
      {
        id: 2,
      },
      {
        id: 1,
      },
    ]);
  });

  it('should call compareTime in desc order', () => {
    const data = [
      {
        timestamp: new Date('2021/8/2').getTime(),
      },
      {
        timestamp: new Date('2021/10/2').getTime(),
      },
      {
        timestamp: new Date('2021/1/2').getTime(),
      },
    ];

    const result = data.sort((component as any).compareTime);

    expect(result).toEqual([
      {
        timestamp: 1633125600000,
      },
      {
        timestamp: 1627855200000,
      },
      {
        timestamp: 1609542000000,
      },
    ]);
  });

  it('should subscribe to fetch data', () => {
    spyOn(service, 'getTransactionDetails').and.returnValue(
      of({ data: { days: [] } })
    );

    component.getTransaction({
      startDate: '2023/08/11',
      endDate: '2023/08/11',
    });
    fixture.detectChanges();

    service
      .getTransactionDetails({ startDate: '2023/08/11', endDate: '2023/08/11' })
      .subscribe((res) => {
        expect(res).toEqual({ data: { days: [] } });
      });
  });
});

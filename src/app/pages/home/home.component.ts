import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { HomeService } from './home.service';
import { DateRangeType } from './home.interface';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAccordion } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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
  providers: [MatDatepickerModule, HomeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @HostBinding('class.bk-web-home-page') componentClass = true;
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  @Input() selectedRangeValue: DateRange<Date> | undefined;

  selected: Date | null = null;

  selectedMode: string | undefined = 'All';
  modeType: string[] = ['All', 'Range'];

  public transactionDetails$: Observable<any> | undefined;
  public isRangeSelected = false;
  private unsubscribe$ = new Subject();

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    const formData: DateRangeType = {
      startDate: '',
      endDate: '',
    };

    this.getTransaction(formData);
  }

  public getTransaction(formData: DateRangeType) {
    this.transactionDetails$ = undefined;
    setTimeout(() => {
      this.transactionDetails$ = this.homeService
        .getTransactionDetails(formData)
        .pipe(
          tap((data) => {
            data?.days.map((element: { transactions: any[] }) => {
              return element.transactions.sort(this.compareTime);
            });
            return data?.days.sort(this.compareDate);
          }),
          map((data) => {
            if (data?.days.length) {
              return data;
            }
            return { days: [] };
          }),
          takeUntil(this.unsubscribe$)
        );
    }, 1000);
  }

  public showDetailedPage(event: any, data: any): void {
    this.router.navigateByUrl('/details', { state: data });
  }

  public selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }

    this.getTransaction({
      startDate: this.getDate(this.selectedRangeValue.start),
      endDate: this.getDate(this.selectedRangeValue.end),
    });
  }

  public radioChange(event: any): void {
    if (event.value === 'All') {
      this.getTransaction({
        startDate: '',
        endDate: '',
      });
    }
  }

  public getDate(dt: any): string {
    if (!dt) {
      return '';
    }
    var dateObj = new Date(dt);
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    return (
      year +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (day < 10 ? '0' + day : day)
    );
  }

  private compareDate(a: any, b: any): number {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  }

  private compareTime(a: any, b: any): number {
    if (a.timestamp > b.timestamp) {
      return -1;
    }
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    return 0;
  }
}

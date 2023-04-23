import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
    MatSlideToggleModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
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

  public transactionDetails$: Observable<any> | undefined;
  public isRangeSelected = false;
  private unsubscribe$ = new Subject();

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit() {
    const formData: DateRangeType = {
      stardDate: '',
      endDate: '',
    };

    this.getTransaction(formData);
  }

  public getTransaction(formData: DateRangeType) {
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
            console.log(data);
            return data;
          }
        }),
        takeUntil(this.unsubscribe$)
      );
  }

  public showDetailedPage(event: any, data: any): void {
    console.log(data);
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
    console.log(this.selectedRangeValue);
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

import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeService } from './home.service';
import { DateRangeType } from './home.interface';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAccordion } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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
    HttpClientModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [MatDatepickerModule, HomeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @HostBinding('class.bk-web-home-page') componentClass = true;
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  selected: Date | null = null;

  public transactionDetails$: Observable<any> | undefined;
  private unsubscribe$ = new Subject();

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    const formData: DateRangeType = {
      stardDate: '',
      endDate: '',
    };

    setTimeout(() => {
      this.getTransaction(formData);
    }, 2000);
  }

  public getTransaction(formData: DateRangeType) {
    this.transactionDetails$ = this.homeService
      .getTransactionDetails(formData)
      .pipe(
        tap((data) => {
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

  private compareDate(a: any, b: any): number {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  }
}

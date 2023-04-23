import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DateRangeType } from './home.interface';

@Injectable()
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getTransactionDetails(dateRange: DateRangeType) {
    return this.httpClient.post<any>('/api/transactions', dateRange, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    });
  }
}

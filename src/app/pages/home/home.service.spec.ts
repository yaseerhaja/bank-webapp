import { TestBed, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeService } from './home.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('HomeService', () => {
  let service: HomeService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [HomeService],
    });
    injector = getTestBed();
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud have Employee data', () => {
    service
      .getTransactionDetails({
        startDate: '2023/11/1',
        endDate: '2023/11/10',
      })
      .subscribe((posts) => {
        expect(posts.items.length).toBe(24);
      });
    const request = httpMock.expectOne(`/api/transactions`);
    expect(request.request.method).toBe('POST');
  });
});

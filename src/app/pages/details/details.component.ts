import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public data: any;
  constructor(private location: Location) {}

  ngOnInit() {
    this.data = this.location.getState();
  }

  public getDate(dt: any): string {
    var dateObj = new Date(dt);
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    return year + '/' + month + '/' + day;
  }

  public getTime(t: any): string {
    var currentdate = new Date(t);
    return (
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds()
    );
  }
}

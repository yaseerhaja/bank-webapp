import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { RouterTestingModule } from '@angular/router/testing';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent, RouterTestingModule, MatChipsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Date value', () => {
    const dt = '2022-11-08T10:30:47.123456';
    const result = component.getDate(dt);

    expect(result).toBe('2022/11/8');
  });

  it('should get Time value', () => {
    const dt = '2022-11-08T10:30:47.123456';
    const result = component.getTime(dt);

    expect(result).toBe('10:30:47');
  });
});

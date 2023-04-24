import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NoPageFoundComponent } from './no-page-found.component';

describe('NoPageFoundComponent', () => {
  let component: NoPageFoundComponent;
  let fixture: ComponentFixture<NoPageFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPageFoundComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NoPageFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsHistoryComponent } from './alerts-history.component';

describe('AlertsHistoryComponent', () => {
  let component: AlertsHistoryComponent;
  let fixture: ComponentFixture<AlertsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

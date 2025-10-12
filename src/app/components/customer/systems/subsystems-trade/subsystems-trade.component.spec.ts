import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsystemsTradeComponent } from './subsystems-trade.component';

describe('SubsystemsTradeComponent', () => {
  let component: SubsystemsTradeComponent;
  let fixture: ComponentFixture<SubsystemsTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsystemsTradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsystemsTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSystemsComponent } from './global-systems.component';

describe('GlobalSystemsComponent', () => {
  let component: GlobalSystemsComponent;
  let fixture: ComponentFixture<GlobalSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSystemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

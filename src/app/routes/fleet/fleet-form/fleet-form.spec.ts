import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetForm } from './fleet-form';

describe('FleetForm', () => {
  let component: FleetForm;
  let fixture: ComponentFixture<FleetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

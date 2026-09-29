import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetList } from './fleet-list';

describe('FleetList', () => {
  let component: FleetList;
  let fixture: ComponentFixture<FleetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetList],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

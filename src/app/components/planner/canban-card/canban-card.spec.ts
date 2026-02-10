import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbanCard } from './canban-card';

describe('CanbanCard', () => {
  let component: CanbanCard;
  let fixture: ComponentFixture<CanbanCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanbanCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanbanCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

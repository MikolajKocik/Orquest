import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbanColumn } from './canban-column';

describe('CanbanColumn', () => {
  let component: CanbanColumn;
  let fixture: ComponentFixture<CanbanColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanbanColumn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanbanColumn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

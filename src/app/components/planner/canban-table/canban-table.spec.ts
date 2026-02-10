import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbanTable } from './canban-table';

describe('CanbanTable', () => {
  let component: CanbanTable;
  let fixture: ComponentFixture<CanbanTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanbanTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanbanTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

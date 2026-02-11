import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormCard } from './edit-form-card';

describe('EditFormCard', () => {
  let component: EditFormCard;
  let fixture: ComponentFixture<EditFormCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFormCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

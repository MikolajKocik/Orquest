import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormCard } from './create-form-card';

describe('CreateFormCard', () => {
  let component: CreateFormCard;
  let fixture: ComponentFixture<CreateFormCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFormCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, input, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../models/auth/user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-form-card',
  imports: [ReactiveFormsModule],
  templateUrl: './create-form-card.html',
  styleUrl: './create-form-card.css',
})
export class CreateFormCard {
  protected activeModal = inject(NgbActiveModal);

  users = input<User[]>([]);

  protected initialColumn = input.required<string>();

  protected createForm: FormGroup;

  constructor() {
    this.createForm = new FormGroup({
      taskName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      assignedTo: new FormControl(null),
      priority: new FormControl('Low'),
      attachments: new FormControl(null),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }

  comparedUsers(user1: User, user2: User): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  onSubmit() {
    if (this.createForm.valid) {
      this.activeModal.close(this.createForm.value);
    }
  }
}

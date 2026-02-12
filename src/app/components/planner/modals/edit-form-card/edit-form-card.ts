import { Component, input, OnInit, inject } from '@angular/core';
import { User } from '../../../../models/auth/user';
import { CanbanTask } from '../../../../models/planner/canban-task';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-form-card',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-form-card.html',
  styleUrl: './edit-form-card.css',
})
export class EditFormCard implements OnInit {
  users = input<User[]>([]);
  task = input<CanbanTask>();

  protected activeModal = inject(NgbActiveModal);

  protected editForm: FormGroup;

  constructor() {
    this.editForm = new FormGroup({
      taskName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      assignedTo: new FormControl(null),
      priority: new FormControl('Low'),
      attachments: new FormControl(null),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  comparedUsers(user1: User, user2: User): boolean {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  ngOnInit(): void {
    this.editForm.patchValue({ 
      taskName: this.task()?.name,
      assignedTo: this.task()?.assignedTo,
      priority: this.task()?.priority,
      attachments: this.task()?.attachments,
      description: this.task()?.description
    })
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.activeModal.close(this.editForm.value);
    }
  }
}

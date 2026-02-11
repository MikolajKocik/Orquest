import { Component, input, signal, inject } from '@angular/core';
import { CanbanColumn } from '../canban-column/canban-column';
import { CanbanTask } from '../../../models/planner/canban-task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditFormCard } from '../modals/edit-form-card/edit-form-card';
import { User } from '../../../models/auth/user';

@Component({
  selector: 'app-canban-table',
  standalone: true,
  imports: [CanbanColumn],
  templateUrl: './canban-table.html',
  styleUrl: './canban-table.scss',
})
export class CanbanTable {
    private modalService = inject(NgbModal);

    constructor() {}

    protected tableColumns = signal<CanbanColumn[]>([]);
    protected users = input.required<User[]>();
    protected selectedTask = signal<CanbanTask | null>(null);

    openEditForm(task: CanbanTask) {
      console.log('Opening the edit form for', task.name);
      this.selectedTask.set(task);

      // opening modal
      const modalRef = this.modalService.open(EditFormCard, {
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
        centered: true,
        keyboard: false
      })

      modalRef.componentInstance.task = task;
      modalRef.componentInstance.users = this.users();

      modalRef.result.then((updatedValues) => {
        if (updatedValues) {
          console.log('Data from form:', updatedValues);
          
          const newTask: CanbanTask = {
            ...task,
            ...updatedValues
          };

          this.tableColumns.update(columns => {
            columns.forEach(col => {
              const currentTasks = col.tasks();
              const taskIndex = currentTasks.findIndex(t => 
                t.id === newTask.id);
                
              if (taskIndex !== -1) {
                  currentTasks[taskIndex] = newTask;
                }
              });

              return [...columns];
            })
          }; 
        });
      }
    
}


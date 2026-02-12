import { Component, input, signal, inject } from '@angular/core';
import { CanbanColumn as CanbanColumnComponent } from '../canban-column/canban-column';
import { CanbanColumn } from '../../../models/planner/canban-column';
import { CanbanTask } from '../../../models/planner/canban-task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditFormCard } from '../modals/edit-form-card/edit-form-card';
import { User } from '../../../models/auth/user';
import { CreateFormCard } from '../modals/create-form-card/create-form-card';

@Component({
  selector: 'app-canban-table',
  standalone: true,
  imports: [CanbanColumnComponent],
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
            return columns.map(col => {
              const taskIndex = col.tasks.findIndex(t => t.id === newTask.id);
                
              if (taskIndex !== -1) {
                return {
                  ...col,
                  tasks: col.tasks.map((t, i) => i === taskIndex ? newTask : t)
                };
              }
              return col;
            });
          })
          }; 
        });
      }
    
    openCreateForm(columnName: string) {
      const modalRef = this.modalService.open(CreateFormCard, {
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
        centered: true,
        keyboard: false
      })

      modalRef.componentInstance.users = this.users();
      modalRef.componentInstance.initialColumn = columnName;

      modalRef.result.then((newValues) => {
        if (newValues) {
          const newTask: CanbanTask = { 
            id: Math.floor(Math.random() * 10000),
            name: newValues.taskName,
            assignedTo: newValues.assignedTo,
            priority: newValues.priority,
            description: newValues.description,
            type: columnName as any,
            attachments: []
          };

          this.tableColumns.update(cols => {
            return cols.map(col => {
              if (col.name === columnName) {
                return {
                  ...col,
                  tasks: [...col.tasks, newTask]
                };
              }
              return col;
            });
          });
        }
      }); 
    }

    updateColumnTasks(columnId: string, updatedTasks: CanbanTask[]) {
      this.tableColumns.update(cols => {
        return cols.map(col => {
          if (col.id === columnId) {
            return {
              ...col,
              tasks: updatedTasks
            };
          }
          return col;
        });
      });
    }
}


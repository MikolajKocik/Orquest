import { Component, input, output, signal, effect } from '@angular/core';
import { CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CanbanTask } from '../../../models/planner/canban-task';
import { CanbanCard } from '../canban-card/canban-card';

@Component({
  selector: 'app-canban-column',
  imports: [CdkDropList, CanbanCard],
  templateUrl: './canban-column.html',
  styleUrl: './canban-column.scss',
})
export class CanbanColumn {
  title = input.required<string>();
  tasks = input.required<CanbanTask[]>();

  protected localTasks = signal<CanbanTask[]>([]);

  protected editTask = output<CanbanTask>();
  protected addTask = output<string>();
  protected tasksChanged = output<CanbanTask[]>();

  constructor() {
    effect(() => {
      this.localTasks.set(this.tasks());
    });
  }

  handleEdit(task: CanbanTask) {
    this.editTask.emit(task);
  }

  drop(event: CdkDragDrop<CanbanTask[]>) {
    const currentTasks = this.localTasks();

    if (event.previousContainer === event.container) {
      moveItemInArray(currentTasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        currentTasks,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.localTasks.set([...currentTasks]);
    this.tasksChanged.emit([...currentTasks]);
  }
}

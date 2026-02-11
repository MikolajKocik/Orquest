import { Component, input, output } from '@angular/core';
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
  protected title = input.required<string>();
  tasks = input.required<CanbanTask[]>();

  protected editTask = output<CanbanTask>();

  handleEdit(task: CanbanTask) {
    this.editTask.emit(task);
  }

  drop(event: CdkDragDrop<CanbanTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}

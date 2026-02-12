import { Component, input, computed, output } from '@angular/core';
import { CanbanTask } from '../../../models/planner/canban-task';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-canban-card',
  imports: [CdkDrag],
  standalone: true,
  templateUrl: './canban-card.html',
  styleUrl: './canban-card.scss',
})
export class CanbanCard {
  task = input.required<CanbanTask>();
  protected user = computed(() => this.task().assignedTo);

  cardClicked = output<CanbanTask>();

  onCardClick() {
    this.cardClicked.emit(this.task());
  }
}

import { Component } from '@angular/core';
import { CanbanColumn } from '../canban-column/canban-column';

@Component({
  selector: 'app-canban-table',
  imports: [CanbanColumn],
  templateUrl: './canban-table.html',
  styleUrl: './canban-table.scss',
})
export class CanbanTable {
  
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  nextPage(): void {
    this.next.emit();
  }

  prevPage(): void {
    this.prev.emit();
  }
}

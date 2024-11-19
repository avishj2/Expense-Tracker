import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent {
  @Input() expense!: Expense; // Expense to edit
  @Output() editCompleted = new EventEmitter<void>();

  constructor(private expenseService: ExpenseService) {}

  updateExpense(): void {
    if (this.expense) {
      this.expenseService.updateExpense(this.expense);
      this.editCompleted.emit(); // Notify parent component
    }
  }

  cancelEdit(): void {
    this.editCompleted.emit(); // Notify parent to hide the edit form
  }
}

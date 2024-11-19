import { Component, Output, EventEmitter } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent {
  @Output() expenseAdded = new EventEmitter<void>();

  description: string = '';
  category: string = '';
  amount: number = 0;
  date: string = '';

  constructor(private expenseService: ExpenseService) { }

  addExpense(): void {
    if (this.description && this.category && this.amount && this.date) {
      const newExpense: Expense = {
        id: Date.now(),
        description: this.description,
        category: this.category,
        amount: this.amount,
        date: this.date
      };
      this.expenseService.addExpense(newExpense);
      this.expenseAdded.emit(); // Notify parent
      this.clearForm();
    } else {
      alert('Please fill all fields!');
    }
  }

  clearForm(): void {
    this.description = '';
    this.category = '';
    this.amount = 0;
    this.date = '';
  }
}

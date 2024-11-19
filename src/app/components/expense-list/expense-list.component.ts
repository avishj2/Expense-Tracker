import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  editingExpenseId: number | null = null;
  editableExpense: Expense = this.initializeEditableExpense();
  searchQuery: string = '';

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenses = this.expenseService.getExpenses();
    this.filteredExpenses = [...this.expenses]; 
  }

  startEditing(expense: Expense): void {
    this.editingExpenseId = expense.id;
    this.editableExpense = { ...expense }; 
  }

  saveEdit(): void {
    if (this.editingExpenseId !== null) {
      this.expenseService.updateExpense(this.editableExpense);
      this.editingExpenseId = null;
      this.loadExpenses();
    }
  }

  cancelEdit(): void {
    this.editingExpenseId = null;
    this.editableExpense = this.initializeEditableExpense(); 
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id);
    this.loadExpenses();
  }

  calculateTotalExpense(): number {
    return this.filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  }

  filterExpenses(): void {
    this.filteredExpenses = this.expenses.filter(expense =>
      expense.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      expense.date.includes(this.searchQuery)
    );
  }

  sortExpenses(key: keyof Expense): void {
    this.filteredExpenses.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  }

  private initializeEditableExpense(): Expense {
    return {
      id: 0,
      description: '',
      category: '',
      amount: 0,
      date: ''
    };
  }
}

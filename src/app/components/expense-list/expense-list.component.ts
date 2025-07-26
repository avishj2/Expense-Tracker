import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  editingExpenseId: number | null = null;
  editableExpense: Expense = this.initializeEditableExpense();
  searchQuery: string = '';

  fromDate: string = '';
  toDate: string = '';

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
    return this.filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }

  filterExpenses(): void {
    this.filteredExpenses = this.expenses.filter((expense) => {
      const matchesSearch =
        expense.description
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        expense.category
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        expense.date.includes(this.searchQuery);

      const withinDateRange =
        (!this.fromDate || new Date(expense.date) >= new Date(this.fromDate)) &&
        (!this.toDate || new Date(expense.date) <= new Date(this.toDate));

      return matchesSearch && withinDateRange;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.fromDate = '';
    this.toDate = '';
    this.filteredExpenses = [...this.expenses];
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
      date: '',
    };
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredExpenses);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

    const excelData = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'base64',
    });

    const blob = new Blob(
      [XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })],
      { type: 'application/octet-stream' }
    );

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'expenses.xlsx';
    anchor.click();
    window.URL.revokeObjectURL(url); // Clean up
  }
}

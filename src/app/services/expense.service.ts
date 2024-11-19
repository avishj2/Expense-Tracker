import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private localStorageKey = 'expenses';

  constructor() {
    this.initializeSampleData(); 
  }

  getExpenses(): Expense[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  addExpense(expense: Expense): void {
    const expenses = this.getExpenses();
    expenses.push(expense);
    localStorage.setItem(this.localStorageKey, JSON.stringify(expenses));
  }

  deleteExpense(id: number): void {
    const expenses = this.getExpenses().filter(exp => exp.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(expenses));
  }

  updateExpense(updatedExpense: Expense): void {
    const expenses = this.getExpenses().map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(expenses));
  }
  
  private initializeSampleData(): void {
    if (!localStorage.getItem(this.localStorageKey)) {
      const sampleExpenses: Expense[] = [
        // January
        { id: 1, description: 'Groceries', category: 'Food', amount: 2000, date: '2024-01-05' },
        { id: 2, description: 'Electricity Bill', category: 'Bills', amount: 1500, date: '2024-01-10' },
        { id: 3, description: 'Bus Ticket', category: 'Travel', amount: 200, date: '2024-01-15' },
        { id: 4, description: 'Movie Night', category: 'Entertainment', amount: 500, date: '2024-01-20' },
      
        // February
        { id: 5, description: 'Valentine Dinner', category: 'Food', amount: 3000, date: '2024-02-14' },
        { id: 6, description: 'Internet Bill', category: 'Bills', amount: 1000, date: '2024-02-05' },
        { id: 7, description: 'Taxi Ride', category: 'Travel', amount: 350, date: '2024-02-18' },
        { id: 8, description: 'Concert Tickets', category: 'Entertainment', amount: 2500, date: '2024-02-25' },
      
        // March
        { id: 9, description: 'Groceries', category: 'Food', amount: 2500, date: '2024-03-07' },
        { id: 10, description: 'Water Bill', category: 'Bills', amount: 750, date: '2024-03-12' },
        { id: 11, description: 'Train Ticket', category: 'Travel', amount: 800, date: '2024-03-22' },
        { id: 12, description: 'Cinema', category: 'Entertainment', amount: 1200, date: '2024-03-29' },
      
        // April
        { id: 13, description: 'Groceries', category: 'Food', amount: 2300, date: '2024-04-03' },
        { id: 14, description: 'Electricity Bill', category: 'Bills', amount: 1600, date: '2024-04-10' },
        { id: 15, description: 'Flight Ticket', category: 'Travel', amount: 12000, date: '2024-04-15' },
        { id: 16, description: 'Theatre Play', category: 'Entertainment', amount: 800, date: '2024-04-25' },
      
        // May
        { id: 17, description: 'Groceries', category: 'Food', amount: 1800, date: '2024-05-05' },
        { id: 18, description: 'Internet Bill', category: 'Bills', amount: 1000, date: '2024-05-12' },
        { id: 19, description: 'Car Rental', category: 'Travel', amount: 2500, date: '2024-05-18' },
        { id: 20, description: 'Music Festival', category: 'Entertainment', amount: 3500, date: '2024-05-25' },
      
        // June
        { id: 21, description: 'Groceries', category: 'Food', amount: 1900, date: '2024-06-07' },
        { id: 22, description: 'Water Bill', category: 'Bills', amount: 700, date: '2024-06-12' },
        { id: 23, description: 'Cab Ride', category: 'Travel', amount: 450, date: '2024-06-15' },
        { id: 24, description: 'Movie Premiere', category: 'Entertainment', amount: 800, date: '2024-06-22' },
      
        // July
        { id: 25, description: 'Groceries', category: 'Food', amount: 2100, date: '2024-07-01' },
        { id: 26, description: 'Electricity Bill', category: 'Bills', amount: 1550, date: '2024-07-08' },
        { id: 27, description: 'Bus Ticket', category: 'Travel', amount: 300, date: '2024-07-15' },
        { id: 28, description: 'Summer Camp', category: 'Entertainment', amount: 4000, date: '2024-07-20' },
      
        // August
        { id: 29, description: 'Groceries', category: 'Food', amount: 2000, date: '2024-08-05' },
        { id: 30, description: 'Internet Bill', category: 'Bills', amount: 1000, date: '2024-08-10' },
        { id: 31, description: 'Taxi Ride', category: 'Travel', amount: 600, date: '2024-08-15' },
        { id: 32, description: 'Movie Night', category: 'Entertainment', amount: 1200, date: '2024-08-25' },
      
        // September
        { id: 33, description: 'Groceries', category: 'Food', amount: 2500, date: '2024-09-03' },
        { id: 34, description: 'Water Bill', category: 'Bills', amount: 800, date: '2024-09-10' },
        { id: 35, description: 'Flight Ticket', category: 'Travel', amount: 11000, date: '2024-09-18' },
        { id: 36, description: 'Concert', category: 'Entertainment', amount: 3500, date: '2024-09-22' },
      
        // October
        { id: 37, description: 'Groceries', category: 'Food', amount: 2200, date: '2024-10-05' },
        { id: 38, description: 'Electricity Bill', category: 'Bills', amount: 1400, date: '2024-10-10' },
        { id: 39, description: 'Train Ticket', category: 'Travel', amount: 700, date: '2024-10-15' },
        { id: 40, description: 'Movie Night', category: 'Entertainment', amount: 1000, date: '2024-10-25' },
      
        // November
        { id: 41, description: 'Groceries', category: 'Food', amount: 2000, date: '2024-11-03' },
        { id: 42, description: 'Water Bill', category: 'Bills', amount: 750, date: '2024-11-10' },
        { id: 43, description: 'Bus Ticket', category: 'Travel', amount: 200, date: '2024-11-15' },
        { id: 44, description: 'Music Festival', category: 'Entertainment', amount: 3000, date: '2024-11-20' },
      
        // December
        { id: 45, description: 'Groceries', category: 'Food', amount: 2500, date: '2024-12-05' },
        { id: 46, description: 'Internet Bill', category: 'Bills', amount: 1000, date: '2024-12-10' },
        { id: 47, description: 'Taxi Ride', category: 'Travel', amount: 450, date: '2024-12-15' },
        { id: 48, description: 'Holiday Party', category: 'Entertainment', amount: 5000, date: '2024-12-20' },
      ];
      
      
      localStorage.setItem(this.localStorageKey, JSON.stringify(sampleExpenses));
    }
  }
  
}

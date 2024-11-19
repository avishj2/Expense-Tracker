import { Component, ViewChild } from '@angular/core';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ExpenseListComponent) expenseListComponent!: ExpenseListComponent;
  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  refreshExpenseList(): void {
    if (this.expenseListComponent) {
      this.expenseListComponent.loadExpenses();
    }
  }
}

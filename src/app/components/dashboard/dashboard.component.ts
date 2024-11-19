import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  recentExpenses: Expense[] = [];
  categoryData: Record<string, number> = {}; 
  monthlyData: Record<string, number> = {};  

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    const expenses = this.expenseService.getExpenses();
  console.log('Expenses:', expenses); 
  this.expenses = expenses;
  this.calculateTotalExpenses(expenses);
  this.getRecentExpenses(expenses);
  this.getCategoryData(expenses);
  this.getMonthlyData(expenses);
  this.createCategoryChart();
  this.createMonthlyChart();
  this.createLineChart();
  }

  calculateTotalExpenses(expenses: Expense[]): void {
    this.totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  getRecentExpenses(expenses: Expense[]): void {
    this.recentExpenses = expenses.slice(-5).reverse();
  }

  getCategoryData(expenses: Expense[]): void {
    this.categoryData = expenses.reduce((acc: Record<string, number>, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  }

  getMonthlyData(expenses: Expense[]): void {
    this.monthlyData = expenses.reduce((acc: Record<string, number>, expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {});
  }

  createLineChart(): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
 
    const months = Array.from(
      new Set(
        this.expenses.map((expense) =>
          new Date(expense.date).toLocaleString('default', { month: 'short' })
        )
      )
    ); 
  
    const monthlyTotals = months.map((month) => {
      const monthlyExpenses = this.expenses.filter(
        (expense) =>
          new Date(expense.date).toLocaleString('default', { month: 'short' }) === month
      );
      return monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    });
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: months, 
        datasets: [
          {
            label: 'Total Expenses',
            data: monthlyTotals, 
            borderColor: '#007bff', 
            backgroundColor: 'rgba(0, 123, 255, 0.2)', 
            fill: true, 
            tension: 0.2, 
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Expense Amount (₹)',
            },
            beginAtZero: true, 
          },
        },
      },
    });
  }
  

  
  createCategoryChart(): void {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (!ctx) return;
  
    const backgroundColors = Object.keys(this.categoryData).map(category =>
      this.getCategoryColor(category)
    );
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.categoryData), 
        datasets: [
          {
            data: Object.values(this.categoryData), 
            backgroundColor: backgroundColors, 
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
  

  createMonthlyChart(): void {
    const ctx = document.getElementById('monthlyChart') as HTMLCanvasElement;
  
    const categories = Array.from(new Set(this.expenses.map((expense) => expense.category)));
    const months = Array.from(
      new Set(
        this.expenses.map((expense) =>
          new Date(expense.date).toLocaleString('default', { month: 'short' })
        )
      )
    ); 
  
    const datasets = categories.map((category) => {
      const categoryData = months.map((month) => {
        const monthlyExpenses = this.expenses.filter(
          (expense) =>
            expense.category === category &&
            new Date(expense.date).toLocaleString('default', { month: 'short' }) === month
        );
        return monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      });
  
      return {
        label: category,
        data: categoryData,
        backgroundColor: this.getCategoryColor(category),
      };
    });
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months, 
        datasets: datasets, 
      },
      options: {
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true, 
          },
        },
      },
    });
  }
  
  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      Food: '#4A90E2',         
      Travel: '#50C878',       
      Bills: '#6A0DAD',        
      Entertainment: '#1D4E89', 
      Groceries: '#82CFFD',    
      Others: '#8A2BE2',       
    };
    return colors[category] || '#6C7A89'; 
  }
  
  
  
  
  
}

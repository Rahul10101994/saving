export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string; // ISO String
}

export interface FinanceSummary {
  income: number;
  expenses: number;
  savings: number;
}
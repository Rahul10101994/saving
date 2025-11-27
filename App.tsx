import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Minus, LayoutDashboard, PieChart as PieChartIcon, History, Sparkles } from 'lucide-react';
import { Transaction, TransactionType } from './types';
import { SummaryCards } from './components/SummaryCards';
import { AddTransactionForm } from './components/AddTransactionForm';
import { TransactionList } from './components/TransactionList';
import { OverviewChart } from './components/OverviewChart';
import { AIAdvisor } from './components/AIAdvisor';

const STORAGE_KEY = 'smartfin_transactions_v1';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse transactions", e);
      }
    }
  }, []);

  // Save to local storage on update
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, curr) => acc + curr.amount, 0);
    const savings = income - expenses;
    return { income, expenses, savings };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-10">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <LayoutDashboard className="w-6 h-6" />
            <h1 className="font-bold text-xl tracking-tight text-slate-900">SmartFin</h1>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Monthly Tracker
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Top Summary Cards */}
        <section>
          <SummaryCards 
            income={summary.income} 
            expenses={summary.expenses} 
            savings={summary.savings} 
          />
        </section>

        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Charts & Insights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-slate-500" />
                  Income Allocation
                </h2>
              </div>
              <OverviewChart 
                income={summary.income} 
                expenses={summary.expenses} 
                savings={summary.savings} 
              />
            </div>

            {/* AI Advisor Component */}
            <AIAdvisor summary={summary} transactions={transactions} />
          </div>

          {/* Right Column: Actions & History */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-slate-500" />
                Add Transaction
              </h2>
              <AddTransactionForm onAdd={addTransaction} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[400px]">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-500" />
                Recent History
              </h2>
              <TransactionList 
                transactions={transactions} 
                onDelete={deleteTransaction} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
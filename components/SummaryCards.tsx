import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils';

interface SummaryCardsProps {
  income: number;
  expenses: number;
  savings: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expenses, savings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Income</p>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(income)}</h3>
        </div>
        <div className="p-3 bg-emerald-50 rounded-full">
          <ArrowUpCircle className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(expenses)}</h3>
        </div>
        <div className="p-3 bg-rose-50 rounded-full">
          <ArrowDownCircle className="w-6 h-6 text-rose-600" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Current Savings</p>
          <h3 className={`text-2xl font-bold ${savings >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
            {formatCurrency(savings)}
          </h3>
        </div>
        <div className="p-3 bg-indigo-50 rounded-full">
          <Wallet className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
    </div>
  );
};
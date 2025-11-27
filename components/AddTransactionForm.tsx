import React, { useState } from 'react';
import { TransactionType, Transaction } from '../types';
import { PlusCircle } from 'lucide-react';

interface AddTransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      description,
      amount: parseFloat(amount),
      type,
    });

    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Type Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
        <button
          type="button"
          onClick={() => setType(TransactionType.INCOME)}
          className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
            type === TransactionType.INCOME
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setType(TransactionType.EXPENSE)}
          className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${
            type === TransactionType.EXPENSE
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Expense
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Monthly Rent"
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Amount ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm active:transform active:scale-[0.98]"
      >
        <PlusCircle className="w-5 h-5" />
        Add Transaction
      </button>
    </form>
  );
};
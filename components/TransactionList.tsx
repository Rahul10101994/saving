import React from 'react';
import { Transaction, TransactionType } from '../types';
import { Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        <p>No transactions yet.</p>
        <p className="text-sm">Add your first income or expense.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all bg-slate-50/50 hover:bg-white"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${t.type === TransactionType.INCOME ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
               {t.type === TransactionType.INCOME ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
            </div>
            <div>
              <p className="font-medium text-slate-900">{t.description}</p>
              <p className="text-xs text-slate-500">{formatDate(t.date)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className={`font-semibold ${t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-slate-900'}`}>
              {t.type === TransactionType.INCOME ? '+' : '-'}{formatCurrency(t.amount)}
            </span>
            <button
              onClick={() => onDelete(t.id)}
              className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1"
              aria-label="Delete transaction"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
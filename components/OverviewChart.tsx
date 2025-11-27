import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../utils';

interface OverviewChartProps {
  income: number;
  expenses: number;
  savings: number;
}

export const OverviewChart: React.FC<OverviewChartProps> = ({ income, expenses, savings }) => {
  // We want to show how Income is distributed into Expenses and Savings.
  // If Savings is negative, we only show Expenses (or capped savings at 0) for the visual.
  const chartData = [
    { name: 'Expenses', value: expenses },
    { name: 'Savings', value: Math.max(0, savings) },
  ];

  // If there is no data (everything 0), show a placeholder or empty state
  const hasData = income > 0 || expenses > 0;

  const COLORS = ['#e11d48', '#4f46e5']; // Rose-600, Indigo-600

  if (!hasData) {
    return (
      <div className="h-[300px] flex items-center justify-center text-slate-400 bg-slate-50 rounded-xl">
        <p>No data to visualize yet</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-2">
        <p className="text-sm text-slate-500">Distribution of Total Income</p>
      </div>
    </div>
  );
};
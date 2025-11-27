import React, { useState } from 'react';
import { Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { FinanceSummary, Transaction } from '../types';
import { formatCurrency } from '../utils';

interface AIAdvisorProps {
  summary: FinanceSummary;
  transactions: Transaction[];
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({ summary, transactions }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsight = async () => {
    if (!process.env.API_KEY) {
      setError("API Key is missing. Cannot generate insights.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const promptData = {
        summary: {
            income: formatCurrency(summary.income),
            expenses: formatCurrency(summary.expenses),
            savings: formatCurrency(summary.savings)
        },
        recent_transactions: transactions.slice(0, 10).map(t => ({
            type: t.type,
            amount: t.amount,
            description: t.description
        }))
      };

      const prompt = `
        Act as a friendly, concise financial advisor.
        Analyze the following monthly financial data:
        ${JSON.stringify(promptData, null, 2)}
        
        Provide 3 short, actionable bullet points to help improve savings or manage expenses better. 
        Keep the tone encouraging but professional. Do not use markdown bolding, just plain text or simple bullets.
        Max 100 words.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setInsight(response.text.trim());
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError("Failed to generate insight. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <h3 className="font-semibold text-lg">AI Financial Advisor</h3>
        </div>

        {!insight && !loading && (
          <div>
            <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
              Get personalized insights based on your spending habits using Gemini AI.
            </p>
            <button
              onClick={generateInsight}
              className="bg-white text-indigo-600 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Analyze My Finances
            </button>
          </div>
        )}

        {loading && (
          <div className="py-8 flex flex-col items-center justify-center text-indigo-100">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm">Analyzing your data...</p>
          </div>
        )}

        {error && (
            <div className="bg-white/10 p-4 rounded-lg text-sm text-rose-200 mt-2">
                {error}
            </div>
        )}

        {insight && (
          <div className="animate-fade-in">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 text-sm leading-relaxed text-indigo-50">
              <div className="whitespace-pre-line">{insight}</div>
            </div>
            <button 
                onClick={() => setInsight(null)}
                className="mt-4 text-xs text-indigo-200 hover:text-white underline decoration-indigo-400/50"
            >
                Clear analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
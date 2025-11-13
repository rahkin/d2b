'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { 
  CurrencyDollarIcon,
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface BudgetTrackerProps {
  projectId?: string;
  budget?: {
    amount: number;
    currency: string;
    spent: number;
    allocated: Record<string, number>;
  };
}

export function BudgetTracker({ projectId, budget: initialBudget }: BudgetTrackerProps) {
  const [budget, setBudget] = useState(initialBudget || {
    amount: 0,
    currency: 'PHP',
    spent: 0,
    allocated: {}
  });

  const [expenses, setExpenses] = useState<Array<{
    id: string;
    category: string;
    amount: number;
    description: string;
    date: string;
  }>>([]);

  const remaining = budget.amount - budget.spent;
  const percentageUsed = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;

  // Load expenses if projectId is provided
  useEffect(() => {
    if (projectId) {
      // TODO: Fetch expenses from API
      // fetch(`/api/projects/${projectId}/expenses`)
    }
  }, [projectId]);

  const categories = Object.keys(budget.allocated);
  const categoryData = categories.map(cat => ({
    category: cat,
    allocated: budget.allocated[cat] || 0,
    spent: expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0)
  }));

  const doughnutData = {
    labels: ['Spent', 'Remaining'],
    datasets: [{
      data: [budget.spent, remaining],
      backgroundColor: [
        percentageUsed > 80 ? '#ef4444' : percentageUsed > 60 ? '#f59e0b' : '#22c55e',
        '#e5e5e5'
      ],
      borderWidth: 0
    }]
  };

  const barData = {
    labels: categoryData.map(c => c.category),
    datasets: [
      {
        label: 'Allocated',
        data: categoryData.map(c => c.allocated),
        backgroundColor: '#8b5e3c'
      },
      {
        label: 'Spent',
        data: categoryData.map(c => c.spent),
        backgroundColor: '#d97a3e'
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: budget.currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-br from-primary-50 to-primary-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(budget.amount)}</p>
            </div>
            <CurrencyDollarIcon className="w-12 h-12 text-primary-600 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-accent-50 to-accent-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary mb-1">Spent</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(budget.spent)}</p>
            </div>
            <TrendingDownIcon className="w-12 h-12 text-accent-600 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`card bg-gradient-to-br ${
            remaining > 0 
              ? 'from-success-50 to-success-100' 
              : 'from-error-50 to-error-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary mb-1">Remaining</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(remaining)}</p>
            </div>
            <TrendingUpIcon className={`w-12 h-12 opacity-50 ${
              remaining > 0 ? 'text-success-600' : 'text-error-600'
            }`} />
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground">Budget Usage</h3>
          <span className={`text-sm font-medium ${
            percentageUsed > 80 ? 'text-error-600' : 
            percentageUsed > 60 ? 'text-warning-600' : 
            'text-success-600'
          }`}>
            {percentageUsed.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentageUsed}%` }}
            transition={{ duration: 1 }}
            className={`h-3 rounded-full ${
              percentageUsed > 80 ? 'bg-error-500' : 
              percentageUsed > 60 ? 'bg-warning-500' : 
              'bg-success-500'
            }`}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doughnut Chart */}
        <div className="card">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5" />
            Budget Overview
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || '';
                        const value = formatCurrency(context.parsed);
                        return `${label}: ${value}`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3 className="font-semibold text-foreground mb-4">Category Breakdown</h3>
          <div className="h-64">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => formatCurrency(Number(value))
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Expenses List */}
      {expenses.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-foreground mb-4">Recent Expenses</h3>
          <div className="space-y-2">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">{expense.category}</p>
                  <p className="text-sm text-foreground-secondary">{expense.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(expense.amount)}</p>
                  <p className="text-xs text-foreground-tertiary">{expense.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}





'use client';

import React from 'react';

export function ProjectOverview() {
  const stats = [
    { label: 'Active Projects', value: '12', change: '+2', changeType: 'positive' },
    { label: 'Completed This Month', value: '8', change: '+3', changeType: 'positive' },
    { label: 'Total Earnings', value: '₱125,000', change: '+15%', changeType: 'positive' },
    { label: 'Client Satisfaction', value: '4.8/5', change: '+0.2', changeType: 'positive' },
  ];

  const recentProjects = [
    {
      id: '1',
      title: 'Modern Condo Interior Design',
      client: 'Maria Santos',
      status: 'in-progress',
      progress: 75,
      budget: '₱85,000',
      dueDate: '2024-02-15'
    },
    {
      id: '2',
      title: 'Office Renovation Project',
      client: 'TechStart Inc.',
      status: 'review',
      progress: 90,
      budget: '₱120,000',
      dueDate: '2024-02-10'
    },
    {
      id: '3',
      title: 'Residential Kitchen Design',
      client: 'Juan Dela Cruz',
      status: 'active',
      progress: 45,
      budget: '₱65,000',
      dueDate: '2024-03-01'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-success';
      case 'in-progress': return 'status-info';
      case 'review': return 'status-warning';
      case 'completed': return 'bg-neutral-100 text-neutral-700 border border-neutral-200 px-3 py-1 rounded-full text-sm font-medium';
      default: return 'bg-neutral-100 text-neutral-700 border border-neutral-200 px-3 py-1 rounded-full text-sm font-medium';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Projects</h2>
          <button className="btn-primary text-sm">View All</button>
        </div>

        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div key={project.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-foreground">{project.title}</h3>
                  <p className="text-sm text-foreground-secondary">Client: {project.client}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-foreground-secondary">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{project.budget}</p>
                  <p className="text-xs text-foreground-tertiary">Due: {project.dueDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-soft">
            <span className="text-2xl">🎨</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">Create Moodboard</h3>
          <p className="text-sm text-foreground-secondary mb-4">Use AI to generate design inspiration</p>
          <button className="btn-primary text-sm w-full">Start Creating</button>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-soft">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">New Project</h3>
          <p className="text-sm text-foreground-secondary mb-4">Start a new design project</p>
          <button className="btn-primary text-sm w-full">Create Project</button>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-soft">
            <span className="text-2xl">💰</span>
          </div>
          <h3 className="font-semibold text-foreground mb-2">View Earnings</h3>
          <p className="text-sm text-foreground-secondary mb-4">Check your income and payments</p>
          <button className="btn-primary text-sm w-full">View Details</button>
        </div>
      </div>
    </div>
  );
} 
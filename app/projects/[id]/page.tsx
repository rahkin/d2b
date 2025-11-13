'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { BudgetTracker } from '@/components/projects/BudgetTracker';
import { GanttChart } from '@/components/projects/GanttChart';
import { DocumentIcon, ClipboardDocumentCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: {
    amount: number;
    currency: string;
    spent: number;
    allocated: Record<string, number>;
  };
  timeline: {
    startDate: string;
    endDate: string;
    milestones: any[];
  };
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'timeline' | 'documents' | 'contracts'>('overview');
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchTasks();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        setProject(result.data);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`/api/projects/${projectId}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        // Transform tasks for Gantt chart
        const ganttTasks = result.data.map((task: any) => ({
          id: task.id,
          title: task.title,
          startDate: new Date(task.dueDate || task.createdAt),
          endDate: new Date(task.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
          status: task.status,
          assignee: task.assignee?.name,
          progress: task.status === 'completed' ? 100 : task.status === 'in-progress' ? 50 : 0
        }));
        setTasks(ganttTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  if (!project) {
    return (
      <StandardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </StandardLayout>
    );
  }

  return (
    <StandardLayout>
      <div className="container-section section-padding">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            {project.title}
          </h1>
          <p className="text-foreground-secondary mb-4">{project.description}</p>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'completed' ? 'bg-success-100 text-success-700' :
              project.status === 'in-progress' ? 'bg-primary-100 text-primary-700' :
              'bg-neutral-100 text-neutral-700'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border-secondary mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: DocumentIcon },
            { id: 'budget', label: 'Budget', icon: CurrencyDollarIcon },
            { id: 'timeline', label: 'Timeline', icon: ClipboardDocumentCheckIcon },
            { id: 'documents', label: 'Documents', icon: DocumentIcon },
            { id: 'contracts', label: 'Contracts', icon: ClipboardDocumentCheckIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-700 font-medium'
                    : 'border-transparent text-foreground-secondary hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'budget' && (
            <BudgetTracker
              projectId={projectId}
              budget={project.budget}
            />
          )}

          {activeTab === 'timeline' && (
            <GanttChart
              tasks={tasks}
              startDate={project.timeline.startDate ? new Date(project.timeline.startDate) : undefined}
              endDate={project.timeline.endDate ? new Date(project.timeline.endDate) : undefined}
            />
          )}

          {activeTab === 'documents' && (
            <div className="card">
              <p className="text-foreground-secondary">Documents feature coming soon</p>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="card">
              <p className="text-foreground-secondary">Contracts feature coming soon</p>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-foreground mb-4">Budget Overview</h3>
                <BudgetTracker
                  projectId={projectId}
                  budget={project.budget}
                />
              </div>
              <div className="card">
                <h3 className="font-semibold text-foreground mb-4">Timeline</h3>
                <GanttChart
                  tasks={tasks}
                  startDate={project.timeline.startDate ? new Date(project.timeline.startDate) : undefined}
                  endDate={project.timeline.endDate ? new Date(project.timeline.endDate) : undefined}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </StandardLayout>
  );
}





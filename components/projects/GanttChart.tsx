'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Task {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assignee?: string;
  progress?: number;
}

interface GanttChartProps {
  tasks: Task[];
  startDate?: Date;
  endDate?: Date;
}

export function GanttChart({ tasks, startDate, endDate }: GanttChartProps) {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Calculate date range
  const calcDateRange = () => {
    if (startDate && endDate) {
      return { start: startDate, end: endDate };
    }
    
    if (tasks.length === 0) {
      const today = new Date();
      return {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: new Date(today.getFullYear(), today.getMonth() + 3, 0)
      };
    }

    const dates = tasks.flatMap(t => [t.startDate, t.endDate]);
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    return {
      start: new Date(minDate.getFullYear(), minDate.getMonth(), 1),
      end: new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0)
    };
  };

  const dateRange = calcDateRange();
  const daysDiff = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));

  const getTaskPosition = (task: Task) => {
    const taskStart = task.startDate.getTime();
    const taskEnd = task.endDate.getTime();
    const rangeStart = dateRange.start.getTime();
    const rangeEnd = dateRange.end.getTime();
    
    const left = ((taskStart - rangeStart) / (rangeEnd - rangeStart)) * 100;
    const width = ((taskEnd - taskStart) / (rangeEnd - rangeStart)) * 100;
    
    return { left: Math.max(0, left), width: Math.min(100 - left, width) };
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-success-500';
      case 'in-progress': return 'bg-primary-500';
      case 'review': return 'bg-warning-500';
      default: return 'bg-neutral-300';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-PH', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
          <CalendarIcon className="w-6 h-6" />
          Project Timeline
        </h3>
        <div className="flex gap-2 bg-neutral-100 p-1 rounded-lg">
          {(['day', 'week', 'month'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === mode
                  ? 'bg-primary-600 text-white'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Date Header */}
          <div className="flex border-b border-border-secondary mb-4">
            <div className="w-48 flex-shrink-0 p-2 font-medium text-foreground">
              Task
            </div>
            <div className="flex-1 relative">
              <div className="flex">
                {Array.from({ length: Math.min(30, daysDiff) }).map((_, i) => {
                  const date = new Date(dateRange.start);
                  date.setDate(date.getDate() + i);
                  return (
                    <div
                      key={i}
                      className="flex-1 text-xs text-center p-2 border-r border-border-secondary"
                    >
                      {date.getDate()}
                      <br />
                      <span className="text-foreground-tertiary">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-2">
            {tasks.map((task) => {
              const position = getTaskPosition(task);
              return (
                <div
                  key={task.id}
                  className="flex items-center group cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="w-48 flex-shrink-0 p-2">
                    <p className="font-medium text-foreground text-sm">{task.title}</p>
                    {task.assignee && (
                      <p className="text-xs text-foreground-secondary">{task.assignee}</p>
                    )}
                  </div>
                  <div className="flex-1 relative h-10">
                    <div
                      className={`absolute h-6 rounded ${getStatusColor(task.status)} opacity-80 group-hover:opacity-100 transition-opacity`}
                      style={{
                        left: `${position.left}%`,
                        width: `${position.width}%`,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                    />
                    {task.progress && task.progress > 0 && (
                      <div
                        className="absolute h-6 rounded bg-white opacity-30"
                        style={{
                          left: `${position.left}%`,
                          width: `${(position.width * task.progress) / 100}%`,
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-neutral-300"></div>
          <span className="text-sm text-foreground-secondary">To Do</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary-500"></div>
          <span className="text-sm text-foreground-secondary">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning-500"></div>
          <span className="text-sm text-foreground-secondary">Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success-500"></div>
          <span className="text-sm text-foreground-secondary">Completed</span>
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h4 className="text-xl font-bold text-foreground mb-4">{selectedTask.title}</h4>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <ClockIcon className="w-4 h-4 text-foreground-secondary" />
                <span className="text-foreground-secondary">Start:</span>
                <span className="font-medium">{formatDate(selectedTask.startDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ClockIcon className="w-4 h-4 text-foreground-secondary" />
                <span className="text-foreground-secondary">End:</span>
                <span className="font-medium">{formatDate(selectedTask.endDate)}</span>
              </div>
              {selectedTask.assignee && (
                <div className="text-sm">
                  <span className="text-foreground-secondary">Assignee:</span>
                  <span className="font-medium ml-2">{selectedTask.assignee}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="btn-primary w-full"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}





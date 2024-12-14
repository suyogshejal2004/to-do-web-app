import React from 'react';
import { Task } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  return (
    <AnimatePresence>
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
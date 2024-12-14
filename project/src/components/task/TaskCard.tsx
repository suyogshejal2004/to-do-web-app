import React from 'react';
import { Task } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import TaskStatusButtons from './TaskStatusButtons';
import { getStatusColor } from '../../utils/taskUtils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <motion.h3 
              className="text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {task.title}
            </motion.h3>
            <motion.p 
              className="text-gray-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {task.description}
            </motion.p>
            <motion.div 
              className="flex gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              <span className="px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                {task.category}
              </span>
            </motion.div>
            <motion.p 
              className="text-sm text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </motion.p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(task)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Pencil className="w-5 h-5 text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(task.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </motion.button>
          </div>
        </div>
        <TaskStatusButtons 
          taskId={task.id}
          currentStatus={task.status}
          onStatusChange={onStatusChange}
        />
      </div>
    </motion.div>
  );
}
import React from 'react';
import { Task } from '../types';
import { Pencil, Trash2, CheckCircle, Clock, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
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
              <motion.div 
                className="flex gap-2 mt-4 border-t pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStatusChange(task.id, 'Pending')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <Clock className="w-4 h-4" /> Pending
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStatusChange(task.id, 'In Progress')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" /> In Progress
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStatusChange(task.id, 'Completed')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" /> Completed
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
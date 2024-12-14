import React from 'react';
import { motion } from 'framer-motion';
import { Clock, PlayCircle, CheckCircle } from 'lucide-react';
import { Task } from '../../types';

interface TaskStatusButtonsProps {
  taskId: string;
  currentStatus: Task['status'];
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export default function TaskStatusButtons({ 
  taskId, 
  currentStatus, 
  onStatusChange 
}: TaskStatusButtonsProps) {
  return (
    <motion.div 
      className="flex gap-2 mt-4 border-t pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <StatusButton
        status="Pending"
        currentStatus={currentStatus}
        icon={<Clock className="w-4 h-4" />}
        onClick={() => onStatusChange(taskId, 'Pending')}
      />
      <StatusButton
        status="In Progress"
        currentStatus={currentStatus}
        icon={<PlayCircle className="w-4 h-4" />}
        onClick={() => onStatusChange(taskId, 'In Progress')}
      />
      <StatusButton
        status="Completed"
        currentStatus={currentStatus}
        icon={<CheckCircle className="w-4 h-4" />}
        onClick={() => onStatusChange(taskId, 'Completed')}
      />
    </motion.div>
  );
}

interface StatusButtonProps {
  status: Task['status'];
  currentStatus: Task['status'];
  icon: React.ReactNode;
  onClick: () => void;
}

function StatusButton({ status, currentStatus, icon, onClick }: StatusButtonProps) {
  const isActive = status === currentStatus;
  const getStatusStyles = () => {
    switch (status) {
      case 'Pending': return isActive ? 'bg-yellow-100 text-yellow-800' : 'hover:bg-gray-100';
      case 'In Progress': return isActive ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100';
      case 'Completed': return isActive ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100';
      default: return 'hover:bg-gray-100';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${getStatusStyles()}`}
    >
      {icon} {status}
    </motion.button>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Task } from '../types';
import { Plus, LogOut, Filter } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filter, setFilter] = useState<{
    status?: Task['status'];
    category?: Task['category'];
  }>({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const storedTasks = localStorage.getItem(`tasks_${user.id}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const saveTasks = (newTasks: Task[]) => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(newTasks));
      setTasks(newTasks);
    }
  };

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    saveTasks([...tasks, newTask]);
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    if (!editingTask || !user) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id
        ? { ...task, ...taskData }
        : task
    );

    saveTasks(updatedTasks);
    setEditingTask(undefined);
  };

  const handleDeleteTask = (taskId: string) => {
    saveTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    saveTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter.status && task.status !== filter.status) return false;
    if (filter.category && task.category !== filter.category) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold text-gray-900">Task Manager</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                <Plus className="w-4 h-4" />
                New Task
              </button>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  className="text-sm border-gray-300 rounded-md"
                  value={filter.status || ''}
                  onChange={(e) => setFilter({ ...filter, status: e.target.value as Task['status'] || undefined })}
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <select
                  className="text-sm border-gray-300 rounded-md"
                  value={filter.category || ''}
                  onChange={(e) => setFilter({ ...filter, category: e.target.value as Task['category'] || undefined })}
                >
                  <option value="">All Categories</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                </select>
              </div>
            </div>
          </div>

          <TaskList
            tasks={filteredTasks}
            onEdit={(task) => {
              setEditingTask(task);
              setShowTaskForm(true);
            }}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>

      {showTaskForm && (
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(undefined);
          }}
          initialTask={editingTask}
        />
      )}
    </div>
  );
}
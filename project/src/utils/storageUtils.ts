import { Task, User } from '../types';

export const saveTasksToStorage = (userId: string, tasks: Task[]) => {
  localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
};

export const getTasksFromStorage = (userId: string): Task[] => {
  const tasks = localStorage.getItem(`tasks_${userId}`);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveUserToStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromStorage = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
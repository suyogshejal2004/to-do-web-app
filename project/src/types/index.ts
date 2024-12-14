export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Shopping' | 'Health';
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
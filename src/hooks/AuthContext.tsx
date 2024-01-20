import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface User {
  username: string;
  password: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  id: string;
}

interface AuthContextProps {
  login: (username: string, task: Task[]) => void;
  logout: () => void;
  userName: string;
  tasks: Task[];
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  userName: '',
  tasks: [],
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  const login = (username: string, tasks: Task[]) => {
    setUserName(username);
    setTasks(tasks);
    localStorage.setItem('user', JSON.stringify(username));
  };

  const logout = () => {
    setUserName('');
    setTasks([]);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const localStorageUSers = localStorage.getItem('users');
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      setUserName(currentUser);
      if (localStorageUSers) {
        const users = JSON.parse(localStorageUSers);
        const user = users.find((user: User) => user.username === currentUser);
        if (user) {
          setTasks(user.tasks);
        }
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userName, login, logout, tasks }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
